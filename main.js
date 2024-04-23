const searchInput = document.getElementById('searchInput');
const autocompleteResults = document.getElementById('autocompleteResults');
const repoList = document.getElementById('repoList');
const img = document.createElement('img');
img.src = './krest.svg'
let timeout;

searchInput.addEventListener('input', function () {
    clearTimeout(timeout);
    if (!searchInput.value) {
        autocompleteResults.innerHTML = '';
        return;
    }
    timeout = setTimeout(function () {
        fetch(`https://api.github.com/search/repositories?q=${searchInput.value}`)
            .then(response => response.json())
            .then(data => {
                autocompleteResults.innerHTML = '';
                data.items.slice(0, 5).forEach(item => {
                    const repoItem = document.createElement('div');
                    repoItem.classList.add('autocomplete-item');
                    repoItem.textContent = item.full_name;
                    repoItem.addEventListener('click', function () {
                        addRepository(item.name, item.owner.login, item.stargazers_count);
                        searchInput.value = '';
                        autocompleteResults.innerHTML = '';
                    });
                    autocompleteResults.appendChild(repoItem);
                });
            });
    }, 500);
});

function addRepository(name, owner, stars) {
    const repoItem = document.createElement('li');
    repoItem.innerHTML = `- Name ${name} <br> - Owner ${owner} <br> - Stars ${stars} stars`;
    const deleteButton = document.createElement('button');
    const deleteImg = document.createElement('img');
    deleteImg.src = './krest.svg';
    deleteButton.appendChild(deleteImg);

    deleteButton.addEventListener('click', function () {
    repoList.removeChild(repoItem);
    });

    repoItem.appendChild(deleteButton);
    repoList.appendChild(repoItem);
}
