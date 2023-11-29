export function resetForm(form: any) {
    form.reset();
    Object.keys(form.controls).forEach(key => {
      form.get(key)?.setErrors(null);
    });
}

export function setFormAsDirty(form: any) {
    Object.keys(form.controls).forEach(key => {
      form.get(key)?.markAsDirty();
    });
}
