export const shuffle_array = (array) => {
    for (let i = 1; i < array.length; i++) {
        let rand_i = Math.floor(Math.random() * (i + 1));

        [array[i], array[rand_i]] = [array[rand_i], array[i]];
    }
    return [...array];
};

export const areEqual = (array1, array2) => {
    if (array1.length !== array2.length)
        return false;
    for (let i in array1)
        if (array1[i] !== array2[i])
            return false;

    return true;
};
