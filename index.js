const highScoresBtn = document.getElementById(`highScoresBtn`);
const wrapper = document.getElementById(`wrapper`);
const highScores = document.getElementById(`highScores`);
const homePage = document.getElementById(`homePage`);

highScoresBtn.addEventListener(`click`, function() {
    wrapper.style.display = 'none';
    highScores.style.display = 'grid';
});

homePage.addEventListener(`click`, function() {
    wrapper.style.display = 'grid';
    highScores.style.display = 'none';
})