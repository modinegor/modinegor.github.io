const localeDate = (locale, date=null) => {
    if (date)
        date = new Date(date);
    else
        date = new Date();

    return {
        row: date.getTime(),
        str: date.toLocaleString(locale)
    };
};


exports.dateTimeUs = date => {
    return localeDate('en-us', date);
};

exports.dateTimeRu = date => {
    return localeDate('ru-ru', date);
};

exports.daysFromNow = date => {
    let now = Date.now();

    return (now - date) / (1000 * 24 * 60 * 60);
};
