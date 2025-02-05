// *********  DATA ********** //
const data = [
  {
    videoId: 'gcG9Cc1_iV4',
    title: 'Helena (MCR Cover) - Archeons | Sims 4 Machinima',
    category: 'music',
    favorite: true,
  },
  {
    videoId: 'rQv5eFyvRig',
    title: 'GETTING BETTER and also WORSE | Lethal Company - Part 4',
    category: 'letsPlay',
    favorite: false,
  },
  {
    videoId: 'PlxWf493en4',
    title: 'How to Make a Super Simple Website',
    category: 'coding',
    favorite: false,
  },
  {
    videoId: 'GC2NhUchz6c',
    title: 'What if we had our own MONOPOLY board? | GRUMPOPOLY',
    category: 'letsPlay',
    favorite: true,
  },
  {
    videoId: '1Rs2ND1ryYc',
    title: 'Zero to Hero',
    category: 'coding',
    favorite: false,
  },
  {
    videoId: 'IWBbsv0GunU',
    title: 'Rain City Drive - "Witch Hunt" (Lyric Video)',
    category: 'music',
    favorite: true,
  },
];

// *********  UTILITY FUNCTIONS  ********* //
const renderToDom = (divId, textToRender) => {
  const selectedElement = document.querySelector(divId);
  selectedElement.innerHTML = textToRender;
};

// *********  HTML COMPONENT FUNCTIONS  ********* //
// *********  These are all built out so we can focus on the JS  ********* //

// Add Video Button / Modal
const videoBtnModal = () => {
  const domString = `
    <!-- Button trigger modal -->
    <img src="assets/images/hufftube.png" alt="youtube logo" class="logo">
    <button type="button" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#add-video">
    Add Video
    </button>
    <!-- Modal -->
    <div class="modal fade" id="add-video" tabindex="-1" aria-labelledby="add-video" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen-md-down">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add Video</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" id="modal-body">
          <form>
          <div class="form-floating mb-3">
            <input class="form-control form-control-lg" type="text" placeholder="Video ID" id="videoId" aria-label="video id" required>
            <label for="videoId">YouTube Video ID</label>
          </div>
      
          <div class="form-floating mb-3">
            <input class="form-control form-control-lg" type="text" placeholder="Title" id="title" aria-label="title" required>
            <label for="title">Title</label>
          </div>
      
          <div class="form-floating mb-3">
            <select class="form-select form-control-lg" id="category" aria-label="category" required>
              <option value="">Select a category</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="javascript">JavaScript</option>
              <option value="music">Music</option>
            </select>
            <label for="category">Category</label>
          </div>
          
          <div class="form-check mb-3">
            <input class="form-check-input" type="checkbox" value="" id="favorite">
            <label class="form-check-label" for="favorite">
              Favorite
            </label>
          </div>
      
          <button 
            type="submit" 
            class="btn btn-success" 
          >
            Submit
          </button>
        </form>
          </div>
        </div>
      </div>
    </div>
  `;
  renderToDom('#createBtnContainer', domString);
};

// Video component with default arg value
// = 'cNjIUSDnb9k'
const videoPlayer = (videoId) => {
  const domString = `
  <iframe src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  `;
  renderToDom('#videoPlayer', domString);
};

// Filter Button Row
const filterButtons = () => {
  const domString = `
  <div class="d-flex flex-wrap justify-content-between my-3">
    <button class="btn btn-secondary btn-lg buttonRow" id="music">Music</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="coding">Coding</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="letsPlay">Let's Plays</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="favorite">Favorites</button>
    <button class="btn btn-secondary btn-lg buttonRow" id="clear">Clear Filter</button>
  </div>
  `;
  renderToDom('#filterContainer', domString);
};

// Cards
const cardsOnDom = (array) => {
  let domString = '';
  for (const item of array) {
    domString += `
    <div class="mb-3 d-flex align-items-center" style="background: #FFFFFF14; padding: 20px; border: 1px solid black; border-radius: 10px;">
    <div class="flex-shrink-0">
      <img src="./assets/images/${item.category}.png" style="width: 120px; height: 120px; border-radius: 20px;" alt="${item.category} icon">
    </div>
    <div class="flex-grow-1 ms-3">
      <h2 style="color: white; font-size: 24px; font-weight: bold; padding: 0px; margin: 0px">${item.favorite ? '⭐' : ''} ${item.title}</h2>
      <p style="color: #999; margin-top: 10px;"><b>Category:</b> ${item.category.toUpperCase()}</p>
      <button class="btn btn-dark" id="watch--${item.videoId}">Watch Video</button>
    </div>
    <div>
      <button class="btn btn-danger" id="delete--${item.videoId}">X</button>
    </div>
  </div>
    `;
  }
  renderToDom('#cardContainer', domString);
};

// *********  EVENT LISTENERS  *********  //
const eventListeners = () => {
  // Bootstrap for grabbing modal so can manually open and close.
  // We will not go deeply into this. You can view the documentation if you would like to know more and as questions in the help thread.
  const formModal = new bootstrap.Modal(document.querySelector('#add-video'));
  
  // FILTER BUTTON ROW
  document.querySelector('#filterContainer').addEventListener('click', (e) => {
    // console.log("You clicked a filter button", e.target.id);
    // filter on category (either use .filter or a loop)
    if (e.target.id === 'clear'){
      cardsOnDom(data);
    } else if (e.target.id === 'favorite') {
      cardsOnDom(data.filter((video) => video.favorite));
    } else if (e.target.id) {
      cardsOnDom(data.filter((video) => video.category === e.target.id));
    }
    // rerender DOM with new array (use the cardsOnDom function)
  });

  // BUTTONS ON CARDS
  document.querySelector('#cardContainer').addEventListener('click', (e) => {
    // check to make sure e.target.id is not empty
    if (e.target.id) {
      // get the video ID off the button ID
      const [, videoId] = e.target.id.split('--');
      // find the index of the object in the array
      const index = data.findIndex((video) => video.videoId === videoId);
      // only listen for events with "watch" or "delete" included in the string

      // if watch: grab the ID and rerender the videoPlayer with that ID as an argument
      if (e.target.id.includes('watch')) {
        // console.log("Pressed Watch Button")
        videoPlayer(data[index].videoId);       
        // scroll to top of page
        document.location = '#';
      }

      // if delete: find the index of item in array and splice
      // NOTE: if 2 videos have the same videoId, this will delete the first one in the array
      if (e.target.id.includes('delete')) {
        // console.log("Delete Button Pressed")
        // rerender DOM with updated data array (use the cardsOnDom function)
        data.splice(index, 1);
        cardsOnDom(data);
      }
    }
  });

  // FORM SUBMIT
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault(); // this goes in EVERY form submit to prevent page reload
    // grab the values from the form inputs and create an object
    const newVideo = {
      videoId: document.querySelector('#videoId').value,
      title: document.querySelector('#title').value,
      category: document.querySelector('#category').value,
      favorite: document.querySelector('#favorite').value,
    }
    // push that object to the data array 
    data.push(newVideo);   
    // rerender cards using the cardsOnDom function and pass it the updated data array
    cardsOnDom(data);
    // Close modal and reset form
    formModal.hide();
    form.reset();
  });
};

// *********  FUNCTION TO START APPLICATION  *********  //
const startApp = () => {
  videoBtnModal();
  videoPlayer('gcG9Cc1_iV4');
  filterButtons();
  cardsOnDom(data);
  eventListeners(); // always last
};

startApp();
