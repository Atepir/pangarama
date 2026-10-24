import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { NeedSelect } from "@/components/contact/need-select";
import { CONTACT_FORM, NEED_OPTIONS } from "@/content/pages";

const TRIGGER_ID = "contact-need";
const LABEL_ID = "contact-need-label";

function setup(value = "", props: { invalid?: boolean; describedBy?: string } = {}) {
  const onChange = vi.fn();

  render(
    <>
      <span id={LABEL_ID}>Type de besoin</span>
      <NeedSelect
        id={TRIGGER_ID}
        labelId={LABEL_ID}
        value={value}
        onChange={onChange}
        invalid={props.invalid}
        describedBy={props.describedBy}
      />
    </>,
  );

  return {
    onChange,
    user: userEvent.setup(),
    trigger: screen.getByRole("combobox"),
  };
}

describe("NeedSelect", () => {
  it("se présente comme une liste déroulante fermée", () => {
    const { trigger } = setup();

    expect(trigger).toHaveAttribute("id", TRIGGER_ID);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveAttribute("aria-controls", `${TRIGGER_ID}-listbox`);
    expect(trigger).toHaveAttribute("aria-haspopup", "listbox");
    expect(trigger).toHaveTextContent(CONTACT_FORM.selectPlaceholder);
    expect(trigger).not.toHaveAttribute("aria-activedescendant");
    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("expose les six types de besoin de la maquette, dans l’ordre", async () => {
    const { user, trigger } = setup();

    await user.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("listbox")).toHaveAttribute(
      "id",
      `${TRIGGER_ID}-listbox`,
    );

    const options = screen.getAllByRole("option");

    expect(options).toHaveLength(6);
    expect(options.map((option) => option.textContent)).toEqual(
      NEED_OPTIONS.map((option) => option.label),
    );
    expect(options.map((option) => option.id)).toEqual(
      NEED_OPTIONS.map((_, index) => `${TRIGGER_ID}-option-${index}`),
    );
    expect(trigger).toHaveAttribute(
      "aria-activedescendant",
      `${TRIGGER_ID}-option-0`,
    );
  });

  it("sélectionne une option à la souris et referme la liste", async () => {
    const { onChange, user, trigger } = setup();

    await user.click(trigger);
    await user.click(screen.getByRole("option", { name: NEED_OPTIONS[3]!.label }));

    expect(onChange).toHaveBeenCalledWith(NEED_OPTIONS[3]!.value);
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("affiche la sélection courante et la marque comme active", async () => {
    const { user, trigger } = setup(NEED_OPTIONS[2]!.value);

    expect(trigger).toHaveTextContent(NEED_OPTIONS[2]!.label);

    await user.click(trigger);

    const options = screen.getAllByRole("option");

    expect(options[2]).toHaveAttribute("aria-selected", "true");
    expect(options[0]).toHaveAttribute("aria-selected", "false");
    // La liste s’ouvre sur la sélection courante.
    expect(trigger).toHaveAttribute(
      "aria-activedescendant",
      `${TRIGGER_ID}-option-2`,
    );
  });

  it("se pilote entièrement au clavier", async () => {
    const { onChange, trigger } = setup();

    trigger.focus();
    expect(trigger).toHaveFocus();

    await userEvent.keyboard("{Enter}");

    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await userEvent.keyboard("{ArrowDown}");
    expect(trigger).toHaveAttribute(
      "aria-activedescendant",
      `${TRIGGER_ID}-option-1`,
    );

    await userEvent.keyboard("{ArrowDown}{Enter}");

    expect(onChange).toHaveBeenCalledWith(NEED_OPTIONS[2]!.value);
    expect(screen.queryByRole("listbox")).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it("gère les touches Origine et Fin sans dépasser la liste", async () => {
    const { onChange, trigger } = setup();

    trigger.focus();
    await userEvent.keyboard("{ArrowDown}");

    await userEvent.keyboard("{End}");
    expect(trigger).toHaveAttribute(
      "aria-activedescendant",
      `${TRIGGER_ID}-option-5`,
    );

    // Au-delà de la dernière option, la sélection reste stable.
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Enter}");
    expect(onChange).toHaveBeenCalledWith(NEED_OPTIONS[5]!.value);

    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Home}");
    expect(trigger).toHaveAttribute(
      "aria-activedescendant",
      `${TRIGGER_ID}-option-0`,
    );

    await userEvent.keyboard("{ArrowUp}");
    await userEvent.keyboard("{Enter}");
    expect(onChange).toHaveBeenLastCalledWith(NEED_OPTIONS[0]!.value);
  });

  it("referme la liste sur Échap sans changer la valeur", async () => {
    const { onChange, trigger } = setup();

    trigger.focus();
    await userEvent.keyboard("{ArrowDown}");

    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await userEvent.keyboard("{Escape}");

    expect(screen.queryByRole("listbox")).toBeNull();
    expect(trigger).toHaveFocus();
    expect(onChange).not.toHaveBeenCalled();
  });

  it("se referme au clic hors du contrôle", async () => {
    const { user, trigger } = setup();

    await user.click(trigger);
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await user.click(document.body);

    expect(screen.queryByRole("listbox")).toBeNull();
  });

  it("signale son état invalide aux technologies d’assistance", () => {
    const { trigger } = setup("", {
      invalid: true,
      describedBy: `${TRIGGER_ID}-error`,
    });

    expect(trigger).toHaveAttribute("aria-invalid", "true");
    expect(trigger).toHaveAttribute("aria-describedby", `${TRIGGER_ID}-error`);
    // Le libellé et la valeur servent de nom accessible.
    expect(trigger).toHaveAccessibleName(/Type de besoin/);
  });
});
