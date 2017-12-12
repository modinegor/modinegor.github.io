export function shuffle_array(array) {
    for (let i = 1; i < array.length; i++) {
        let rand_i = Math.floor(Math.random() * (i + 1));

        [array[i], array[rand_i]] = [array[rand_i], array[i]];
    }
}