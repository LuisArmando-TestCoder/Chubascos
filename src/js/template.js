class Template {
  constructor(string, reject = {
    styles: true,
    scripts: true,
  }) {
    this.string = string;
    this.reject = reject;
    return this.getElement;
  }

  get getElement() {
    const fakeParent = document.createElement('div');

    fakeParent.innerHTML = this.string;

    const [childClone] = fakeParent.children;
    const styles = [...childClone.querySelectorAll('style')];
    const scripts = [...childClone.querySelectorAll('script')];

    if (this.reject.styles) styles.forEach(element => element.remove());
    if (this.reject.scripts) scripts.forEach(element => element.remove());

    fakeParent.remove();
    return childClone;
  }
}

export default Template;
