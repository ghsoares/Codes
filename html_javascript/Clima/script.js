Weather.setApiKey("817edc3a3d0710414e7a6e05d9499bfc")

Weather.getCurrent("São Paulo", (current) => {
    console.log(current);
})