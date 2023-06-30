import React from "react";
import "@testing-library/jest-dom";

import { render } from "@testing-library/react";

import { Contacts } from "../../src/client/pages/Contacts";

describe("Проверка страницы Contacts", () => {
  it("Заголовок на странице должен иметь текст Contacts", () => {
    const { getByRole } = render(<Contacts />);

    const headingText = getByRole("heading").textContent;

    expect(headingText).toBe("Contacts");
  });

  it("На странице должно быть 2 параграфа со статическим текстом", () => {
    
    const texts = [
      "Ut non consequatur aperiam ex dolores. Voluptatum harum consequatur est totam. Aut voluptatum aliquid aut optio et ea.",
      "Quaerat et eligendi minus quasi. Culpa voluptatem voluptatem dolores molestiae aut quos iure.",
      "Repellat aperiam ut aliquam iure. Veritatis magnam quisquam et dolorum recusandae aut.",
      "Molestias inventore illum architecto placeat molestias ipsam facilis ab quo.",
      "Rem dolore cum qui est reprehenderit assumenda voluptatem nisi ipsa. Unde libero quidem. Excepturi maiores vel quia.",
      "Neque facilis nobis minus veniam id. Eum cum eveniet accusantium molestias voluptas aut totam laborum aut.",
      "Ea molestiae ullam et. Quis ea ipsa culpa eligendi ab sit ea error suscipit. Quia ea ut minus distinctio quam eveniet nihil.",
      "Aut voluptate numquam ipsa dolorem et quas nemo.",
    ];

    const { container } = render(<Contacts />);

    const textContent = container.textContent;
    const isIncludes = texts.every((item) => textContent?.includes(item));

    expect(isIncludes).toBeTruthy();
  });
});

const list = [
  { width: 320, height: 480 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
];
