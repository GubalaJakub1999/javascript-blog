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

      const articleTagHtml = `<li><a href=#tag-${tag}>${tag},</a></li>`;

      /* add generated code to html variable */

      html += articleTagHtml;

    /* END LOOP: for each tag */
    }

    /* insert HTML of all the links into the tags wrapper */

    TagWrapper.innerHTML = html;

  /* END LOOP: for every article: */
  }
}

generateTags();

const articlesAll = document.querySelectorAll('article');
const tagsArticleSelector = '.post-tags a';

for (let article of articlesAll) {

  const articleTags = article.querySelectorAll(tagsArticleSelector);

  console.log('ssssssssssssssss: ', article, 'articleTags: ', articleTags);

  for(let artcileTag of articleTags) {
    artcileTag.addEventListener('click', tagClickHandler);
  }
}


function tagClickHandler(event){
  /* prevent default action for this event */

  event.preventDefault();

  console.log('ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss');

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  // const href= document.querySelector('a.active[href^="#tag-"]');

  const hrefAttribute =  clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = hrefAttribute.replace('#tag-', '');


  /* find all tag links with class active */

  /* START LOOP: for each active tag link */

    /* remove class active */

  /* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */

  /* START LOOP: for each found tag link */

    /* add class active */

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags(){
  /* find all links to tags */

  /* START LOOP: for each link */

    /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */
}

addClickListenersToTags();