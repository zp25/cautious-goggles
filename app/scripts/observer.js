const backgroundObserver = () => ({
  update: (state) => {
    const color = ['blue', 'green', 'red'];
    const { next } = state;

    console.log(`carouselLite background color: ${color[next - 1]}`); // eslint-disable-line no-console
  },
});

export default backgroundObserver;
