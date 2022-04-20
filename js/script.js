const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML)
}

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
  optArticleTagsSelector = '.post-tags .list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-';

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
      //const articleTitleHtml2 = `<li><a href=#${articleId}><span>${articleId}</span></a></li>`;
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);

      titleLinkListHtml += linkHTML; //titleLinkListHtml = titleLinkListHtml + articleTitleHtml;
    }


    titleList.innerHTML = titleLinkListHtml;

    const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////
  calculateTagsParams();


function generateTags(){

  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

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

      //const articleTagHtml = `<li><a href=#tag-${tag}>${tag}</a></li>`;
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagLink(linkHTMLData);

      /* add generated code to html variable */

      html += linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add generated code to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }


    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */

    TagWrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] create variable for all links HTML code */
  const tagsParams = calculateTagsParams(allTags);
  //let allTagsHTML = '';
  const allTagsData = {tags: []};

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
    /* [NEW] generate code of a link and add it to allTagsHTML */
    //allTagsHTML += '<a href=' + tag + '>' + tag +'(' + allTags[tag] + ') ';
    //const tagLinkHTML = '<li>' + calculateTagClass(allTags[tag], tagsParams) + '</li>';
    //console.log('tagLinkHTML:', tagLinkHTML);
    //allTagsHTML += '<a class='+ optCloudClassPrefix + calculateTagClass(allTags[tag], tagsParams) +' href=' + tag + '>' + tag + '<br>';
    //allTagsHTML += tagLinkHTML;
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  /* [NEW] END LOOP: for each tag in allTags */

  /* [NEW] add html from allTgsHTML to taglist */
  //tagList.innerHTML = allTagsHTML;
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
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

function generateAuthors(){
  let allAuthors = {};

  /* find all articles */

  const ArticlesAll = document.querySelectorAll('article')

  /* START LOOP: for every article: */

  for (let article of ArticlesAll) {

    /* find autor wrapper */
    const optArticleAuthorSelector = '.post-author';
    let authorWrapper = article.querySelector(optArticleAuthorSelector);
    authorWrapper.innerHTML = '';

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

    let getAuthors = article.getAttribute('data-author');

    /* split tags into array */

    const articleAutorsArray = getAuthors.split(' ');

    /* START LOOP: for each tag */

    for (let author of articleAutorsArray) {

      /* generate HTML of the link */

      //const articleAuthorHtml = `<a href=#${author}>${author} </a>`;
      const linkHTMLData = {id: author, title: author};
      const linkHTML = templates.authorLink(linkHTMLData);

      /* add generated code to html variable */

      html += linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(!allAuthors.hasOwnProperty(author)){
        /* [NEW] add generated code to allTags object */
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }


    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */

    authorWrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }
  const authorsList = document.querySelector('.authors');
  //let allAuthorsHTMl = '';
  const allAuthorData = {authors: []};
  for(let author in allAuthors){
    //allAuthorsHTMl += '<a href=' + author + '>' + author +'(' + allAuthors[author] + ')<br> ';
    allAuthorData.authors.push({
      author: author,
      count: allAuthors[author],
    });
  }
  authorsList.innerHTML = templates.authorCloudLink(allAuthorData);
}

generateAuthors();

const articlessAll = document.querySelectorAll('article');
const authorstagsArticleSelector = '.post-tags a';

for (let article of articlessAll) {

  const articleAuthors = article.querySelectorAll(authorstagsArticleSelector);

  for(let artcileAuthor of articleAuthors) {
    artcileAuthor.addEventListener('click', tagClickHandler);
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


////////////////////////////////////////////////////////////////////////////////////////////////

function addClickListenersToAuthors(){
  /* find all links to tags */

  const allLinks = document.querySelectorAll('.post-author a');

  /* START LOOP: for each link */

  for (let link of allLinks) {

    /* add tagClickHandler as event listener for that link */

    link.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */
  }

}
addClickListenersToAuthors();

////////////////////////////////////////////////////////////////////////////////////////////////

function calculateTagsParams(allTags){
  const params = {max:'0', min:'999999'};
  for (let tag in allTags){
    if(allTags[tag] > params.max){
      params.max = allTags[tag];
    }
    if(allTags[tag] < params.min){
      params.min = allTags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1);

  return classNumber;
}