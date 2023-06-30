import React from "react";
import "@testing-library/jest-dom";

import { render } from "@testing-library/react";

import { Delivery } from "../../src/client/pages/Delivery";

describe("Проверка страницы Delivery", () => {
  it("Заголовок на странице должен иметь текст Delivery", () => {
    const { getByRole } = render(<Delivery />);

    const headingText = getByRole("heading").textContent;

    expect(headingText).toBe("Delivery");
  });

  it("На странице должно быть 3 параграфа со статическим текстом", () => {
    const texts = [
      "Deserunt occaecati tempora. Qui occaecati est aliquam. Enim qui nulla ipsam.",
      "Incidunt impedit enim consequuntur amet at consequuntur vero.",
      "Dolor et ad facere asperiores iste est praesentium quaerat iure.",
      "Quibusdam mollitia autem quos voluptas quia est doloremque corporis et.",
      "Sed fuga quasi esse perspiciatis fugit maxime. Qui quidem amet.",
      "Dolores magnam consequatur iste aliquam qui sint non ab.",
      "Culpa saepe omnis. Recusandae vel aperiam voluptates harum.",
      "Perspiciatis qui molestiae qui tempora quisquam. Mollitia voluptatum minus laboriosam.",
      "Ipsam et suscipit est iure incidunt quasi et eum. Culpa libero dignissimos recusandae.",
      "In magni sapiente non voluptas molestias. Deserunt quos quo placeat sunt.",
      "Ea necessitatibus dolores eaque ex aperiam sunt eius. Saepe aperiam aut.",
      "Quaerat natus consequatur aut est id saepe et aut facilis.",
    ];
    const { container } = render(<Delivery />);

    const textContent = container.textContent;
    const isIncludes = texts.every((item) => textContent?.includes(item));

    expect(isIncludes).toBeTruthy();
  });

  it("На странице должна быть одна картинка", () => {
    const { getAllByRole } = render(<Delivery />);

    const images = getAllByRole("img");

    expect(images.length).toBe(1);
  });
});
