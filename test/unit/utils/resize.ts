export const fireResize = (width: number) => {
    window.innerWidth = width;
    window.dispatchEvent(new Event("resize"));
};
