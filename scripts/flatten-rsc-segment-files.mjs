// Next.js writes the RSC page-segment payload of a route as a nested file
// (`<route>/__next.<segment>/__PAGE__.txt`) when the export runs on Windows,
// while the App Router client requests the flat, dot-joined name
// (`<route>/__next.<segment>.__PAGE__.txt`) — the layout Next itself ships on
// Linux (see `node_modules/next/dist/bundle-analyzer/`). Without this step
// every link prefetch 404s: navigation still works, but never from cache.
//
// Renaming the files after the build keeps the exported artifact identical on
// every platform, so no host-specific rewrite rule is needed.
import { readdir, rename, rm, rmdir, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const OUT_DIR = fileURLToPath(new URL("../out/", import.meta.url));
const PAGE_SEGMENT_FILE = "__PAGE__.txt";
const SEGMENT_DIR_PREFIX = "__next.";

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(path);
    } else {
      yield path;
    }
  }
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

// `/contact/__next.contact/__PAGE__.txt`
//   -> `/contact/__next.contact.__PAGE__.txt`
// `/expertises/<slug>/__next.expertises/$d$slug/__PAGE__.txt`
//   -> `/expertises/<slug>/__next.expertises.$d$slug.__PAGE__.txt`
function flattenTarget(file) {
  const segments = relative(OUT_DIR, file).split(sep);
  const start = segments.findIndex((segment) => segment.startsWith(SEGMENT_DIR_PREFIX));
  // No `__next.*` directory, or the `__next.*` name is the file itself: already flat.
  if (start === -1 || start === segments.length - 1) {
    return null;
  }
  return {
    directory: join(OUT_DIR, ...segments.slice(0, start)),
    name: segments.slice(start).join("."),
    // Deepest first, so every emptied directory can be removed in turn.
    emptiedDirs: segments
      .slice(start, -1)
      .map((_, index) => join(OUT_DIR, ...segments.slice(0, start + index + 1)))
      .reverse(),
  };
}

async function main() {
  const targets = [];
  for await (const file of walk(OUT_DIR)) {
    if (file.endsWith(PAGE_SEGMENT_FILE)) {
      const target = flattenTarget(file);
      if (target) {
        targets.push({ file, ...target });
      }
    }
  }

  for (const { file, directory, name } of targets) {
    const destination = join(directory, name);
    if (await exists(destination)) {
      await rm(file, { force: true });
    } else {
      await rename(file, destination);
    }
  }

  // These directories only ever held the payloads moved above; `rmdir` refuses
  // to touch anything that still has content.
  for (const { emptiedDirs } of targets) {
    for (const dir of emptiedDirs) {
      try {
        await rmdir(dir);
      } catch {
        // Not empty anymore (or already gone): leave it alone.
      }
    }
  }

  console.log(
    targets.length === 0
      ? "RSC segment payloads: already flat, nothing to flatten."
      : `RSC segment payloads: flattened ${targets.length} file(s).`,
  );
}

await main();
