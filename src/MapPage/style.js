const MARKER_SIZE = 12;

const mapStyle = {
    width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 50,
    bottom: 0
};

const markerStyle = {
    position: 'relative',
    color: 'white',
    background: '#387de3',
    height: MARKER_SIZE,
    width: MARKER_SIZE,
    marginTop: - MARKER_SIZE / 2,
    marginLeft: - MARKER_SIZE / 2,
    border: '2px solid white',
    borderRadius: '50%',
    cursor: 'pointer'
};

const popupStyle = {
    width: '300px',
    borderRadius: '2px',
    background: 'white',
    color: '#292b2c'
};

export {
    mapStyle,
    markerStyle,
    popupStyle,
    MARKER_SIZE
}