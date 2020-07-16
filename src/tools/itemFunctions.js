exports.favorite = (item, checkFavoritesHasItems, color) => {
    if (localStorage.getItem('favorites') === null) {
        localStorage.setItem('favorites', JSON.stringify([]));
    }

    let favorites = JSON.parse(localStorage.getItem('favorites'));
    let inArray = false;

    for (let i=0;i<favorites.length;i++) {
        if (favorites[i]._id === item._id && favorites[i].color === color) {
            inArray = true;
        }
    };

    if (inArray === false) {
        item.color = color;
        favorites.push(item);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    checkFavoritesHasItems();
};


