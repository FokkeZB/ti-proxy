try {cell.updateViews({
    "#image": {
        top: imageTop,
        left: imageLeft
    }
});} catch (e) { e.filename = __filename; __proxy.exception(e); }