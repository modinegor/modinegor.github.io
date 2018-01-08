function logo_first() {
    return ['logo', {'div': [{}, ['title', 'button']]}]
}

function logo_last() {
    return [{'div': [{}, ['title', 'button']]}, 'logo']
}

export {logo_first, logo_last}