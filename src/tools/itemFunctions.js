exports.checkFavorited = (color) => {
    if (localStorage.getItem('favorites') === null) {
        localStorage.setItem('favorites', JSON.stringify([]))
    }
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    let inFavorites = false;

    for (let i=0;i<favorites.length;i++) {
        if (this.state.item._id === favorites[i]._id && favorites[i].color === color) {
            inFavorites = true;
            break;
        }
    }

    this.setState({favorited: inFavorites});
};

exports.favorite = (item, checkFavoritesHasItems, color) => {
    if (localStorage.getItem('favorites') === null) {
        localStorage.setItem('favorites', JSON.stringify([]));
    }

    let favorites = JSON.parse(localStorage.getItem('favorites'));
    let inArray = false;
    let index = 0;
    item.color = color;

    for (let i=0;i<favorites.length;i++) {
        if (favorites[i]._id === item._id && favorites[i].color === color) {
            inArray = true;
            break;
        }
        index += 1;
    };

    if (inArray) {
        // remove
        favorites.splice(index, 1);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        this.setState({favorited: false});
    } else {
        // add
        favorites.push(item);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        this.setState({favorited: true});
        this.props.openModel()
    }
    checkFavoritesHasItems();
    this.checkFavorited(color);
};