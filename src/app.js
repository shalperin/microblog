import { Marked } from "marked";
import { markedHighlight } from "marked-highlight";
import hljs from 'highlight.js';
import { microblogCount } from './counter2';
import bootstrap from 'bootstrap'

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang, info) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      console.log (`highlighting ${language}`)
      return hljs.highlight(code, { language }).value;
    }
  })
);

let currentIndex = microblogCount
const rootURL = `${window.location.origin}`
const baseURL = `${window.location.origin}/microblogs/`;
const totalFiles = currentIndex;  // Adjust this based on the number of markdown files you have
const folderPath = '/microblogs/';

function pushHash(index) {
    let state = `/post/${index}`
    console.log(`pushing or repushing hash ${state}`)
    window.location.hash = state;
}

function hashChange() {
    let postId = getHashState();
    console.log(`hash changed - postId is ${postId} in hashchange`)
    currentIndex = postId
    loadPost(postId);
}

function getHashState() {
    // console.log("checking hash state")
    const hash = window.location.hash
    if (hash.startsWith('#/post/')) {
        // console.log("have hash state")
        const postId = hash.split('/')[2];
        // console.log(`postId is ${postId}`)
        return postId;
    } else {
        // console.log("no hash state")
    }
}


function loadPost(index) {
    console.log(`trying to load  post ${index}`)
    if (index <0 || index > totalFiles) {
        index = totalFiles
    }

    var filePath = `${baseURL}${String(index).padStart(8, '0')}.md`;
    //console.log(filePath)
    
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(markdown => {
            document.getElementById('markdown-content').innerHTML = marked.parse(markdown);
            updateButtons()
        })
        .catch(error => {
            console.error('Error fetching markdown file:', error);
        });
}

function updateButtons() {
    document.querySelectorAll('.next-button').forEach(button => {
        button.disabled = currentIndex <= 1;
    })
    document.querySelectorAll('.back-button').forEach(button => {
        button.disabled = currentIndex >= totalFiles;
    })
}

function scrollTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling
    });
}


document.addEventListener('DOMContentLoaded', () => {
    console.log("DCL microblog starting up")        
    
    const debug = document.querySelectorAll('#back-button-foo')
    console.log(debug.length)

    const nextButtons = document.querySelectorAll('.next-button')
    console.log(nextButtons.length)
    nextButtons.forEach(button => {
        console.log("adding event listener")
        button.addEventListener('click', () => {
            console.log("click");
            if (currentIndex > 1) {
                currentIndex--;
                pushHash(currentIndex);
            }
            scrollTop();
        });
    });

    document.querySelectorAll('.back-button').forEach(button => {
        console.log("adding event listener")
        button.addEventListener('click', () => {
            console.log("click");
            if (currentIndex < totalFiles) {
                currentIndex++;
                pushHash(currentIndex)
            }
            scrollTop();
        });
    });


    window.addEventListener('hashchange', hashChange)

    // Load the last markdown file on page load
    let index = getHashState()
    if (index === undefined) {
        console.log("It looks like we tried to load the blog root.")
        loadPost(currentIndex)
    } else {
        console.log(`it looks like we tried to load a specfic page index is ${index}`)
        currentIndex = index
        loadPost(currentIndex)
    }
})