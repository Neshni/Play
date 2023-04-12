class PageObjects {
  constructor (page) {
    this.page = page;
  }

  goToUrl = async (url) => {
    await this.page.goto(url);
  };

  addToDo = async (todo, action) => {
    const locator = this.page.locator('input.new-todo');
    await locator.fill(todo);
    await locator.press(action);
  };
}

export { PageObjects };
