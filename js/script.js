'use strict';

generateTitleLinks();

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;

  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
}

  /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE] get 'href' attribute from the clicked link */

  const articleSelector = clickedElement;
  let gethref = clickedElement.getAttribute('href');

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(gethref);

  /* [DONE] add class 'active' to the correct article */

  targetArticle.classList.add('active');
}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

  ////////////////////////////////////////////////////////////////////////////////////////////////

  function generateTitleLinks(){
    /* remove contents of titleList */
    const titleList = document.querySelector('.titles');

    titleList.innerHTML = '';

    const articleList = document.querySelectorAll('.posts .post');

    let titleLinkListHtml = '';

    for (let article of articleList) {
      const articleId = article.id;
      const articleTitle = article.querySelector('.post-title').innerHTML;

      const articleTitleHtml = '<li><a href=#'+ articleId + '><span>' + articleId +'</span></a></li>';
      const articleTitleHtml2 = `<li><a href=#${articleId}><span>${articleId}</span></a></li>`;

      titleLinkListHtml += articleTitleHtml2; //titleLinkListHtml = titleLinkListHtml + articleTitleHtml;
    }


    titleList.innerHTML = titleLinkListHtml;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////

function generateTags(){
  /* find all articles */

  const ArticlesAll = document.querySelectorAll('article')

  /* START LOOP: for every article: */

  for (let article of ArticlesAll) {

    /* find tags wrapper */

    let TagWrapper = article.querySelector(optArticleTagsSelector);
    TagWrapper.innerHTML = '';

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    let getTags = article.getAttribute('data-tags');

    /* split tags into array */

    const articleTagsArray = getTags.split(' ');

    /* START LOOP: for each tag */

    for (let tag of articleTagsArray) {

      /* generate HTML of the link */

      const articleTagHtml = `<li><a href=#tag-${tag}>${tag}</a></li>`;

      /* add generated code to html variable */

      html += articleTagHtml;

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */

    TagWrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////

generateTags();

const articlesAll = document.querySelectorAll('article');
const tagsArticleSelector = '.post-tags a';

for (let article of articlesAll) {

  const articleTags = article.querySelectorAll(tagsArticleSelector);

  for(let artcileTag of articleTags) {
    artcileTag.addEventListener('click', tagClickHandler);
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////

function tagClickHandler(event){
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const hrefAttribute =  clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */


  const tag = hrefAttribute.replace('#tag-', '');

  /* find all tag links with class active */

  const tagsActive = document.querySelectorAll('.list a.active');


  /* START LOOP: for each active tag link */

  for (let tagActive of tagsActive) {

  /* remove class active */

    tagActive.classList.remove('active');

  /* END LOOP: for each active tag link */

  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const allTags = document.querySelectorAll('.list a');

  const filteredTags = [];

   allTags.forEach(function(tagLink) {
    const tagLinkHrefAttribute = tagLink.getAttribute('href');

    if (hrefAttribute === tagLinkHrefAttribute) {
      filteredTags.push(tagLink);
    }
 });

  /* START LOOP: for each found tag link */

  for (let tag of filteredTags) {

    /* add class active */

    tag.classList.add('active');

    /* END LOOP: for each found tag link */

  }
  /* execute function "generateTitleLinks" with article selector as argument */

  const article = document.querySelector('article');
  generateTitleLinks(article);
}

////////////////////////////////////////////////////////////////////////////////////////////////

function addClickListenersToTags(){
  /* find all links to tags */

  const allLinks = document.querySelectorAll('.list a');

  /* START LOOP: for each link */

  for (let link of allLinks) {

    /* add tagClickHandler as event listener for that link */

    link.addEventListener('click', tagClickHandler);

    /* END LOOP: for each link */
  }

}

addClickListenersToTags();

////////////////////////////////////////////////////////////////////////////////////////////////

function generateAutors(){
  /* find all articles */

  const ArticlesAll = document.querySelectorAll('article')

  /* START LOOP: for every article: */

  for (let article of ArticlesAll) {

    /* find autor wrapper */
    const optArticleAuthorSelector = '.post-author';
    let autorWrapper = article.querySelector(optArticleAuthorSelector);
    autorWrapper.innerHTML = '';

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    let getAutors = article.getAttribute('data-author');

    /* split tags into array */

    const articleAutorsArray = getAutors.split();

    /* START LOOP: for each tag */

    for (let autor of articleAutorsArray) {

      /* generate HTML of the link */

      const articleAutorHtml = `<a href=#${autor}>${autor} </a>`;

      /* add generated code to html variable */

      html += articleAutorHtml;

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */

    autorWrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }
}

generateAutors();

const articlessAll = document.querySelectorAll('article');
const authorstagsArticleSelector = '.post-tags a';

for (let article of articlessAll) {

  const articleAutors = article.querySelectorAll(authorstagsArticleSelector);

  for(let artcileAutor of articleAutors) {
    artcileAutor.addEventListener('click', tagClickHandler);
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////

function authorClickHandler(event){
  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const hrefAttribute =  clickedElement.getAttribute('href');

  /* make a new constant "tag" and extract tag from the "href" constant */


  /* find all tag links with class active */

  const authorsActive = document.querySelectorAll('.list a.active');


  /* START LOOP: for each active tag link */

  for (let authors of authorsActive) {

  /* remove class active */

    authors.classList.remove('active');

  /* END LOOP: for each active tag link */

  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const allAuthors = document.querySelectorAll('.post-author a');

  const filteredAuthors = [];

  allAuthors.forEach(function(authorLink) {
    const authorLinkHrefAttribute = authorLink.getAttribute('href');

    if (hrefAttribute === authorLinkHrefAttribute) {
      filteredAuthors.push(authorLink);
    }
 });

  /* START LOOP: for each found tag link */

  for (let author of filteredAuthors) {

    /* add class active */

    author.classList.add('active');

    /* END LOOP: for each found tag link */

  }
  /* execute function "generateTitleLinks" with article selector as argument */

  const article = document.querySelector('article');
  generateTitleLinks(article);
}
authorClickHandler();

////////////////////////////////////////////////////////////////////////////////////////////////

function addClickListenersToAuthors(){
  /* find all links to tags */

  const allLinks = document.querySelectorAll('.post-author a');

  /* START LOOP: for each link */

  for (let link of allLinks) {

    /* add tagClickHandler as event listener for that link */

    link.addEventListener('click', AuthorClickHandler);

    /* END LOOP: for each link */
  }

}
addClickListenersToAuthors();

////////////////////////////////////////////////////////////////////////////////////////////////