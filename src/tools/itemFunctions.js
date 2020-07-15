exports.favorite = (item, check) => {
    if (localStorage.getItem('favorites') === null) {
        localStorage.setItem('favorites', JSON.stringify([]));
    }

    let favorites = JSON.parse(localStorage.getItem('favorites'));
    let inArray = false;

    for (let i=0;i<favorites.length;i++) {
        if (favorites[i]._id === item._id) {
            inArray = true;
        }
    };

    if (inArray === false) {
        favorites.push(item);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    check();
};


