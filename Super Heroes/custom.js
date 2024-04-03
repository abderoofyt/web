(function($){$(function(){$('.button-collapse').sideNav();$('.scrollspy').scrollSpy();var animationDelay=2500,barAnimationDelay=3800,barWaiting=barAnimationDelay-3000,lettersDelay=50,typeLettersDelay=150,selectionDuration=500,typeAnimationDelay=selectionDuration+800,revealDuration=600,revealAnimationDelay=1500;initHeadline();function initHeadline(){singleLetters($('.cd-headline.letters').find('b'));animateHeadline($('.cd-headline'));}
function singleLetters($words){$words.each(function(){var word=$(this),letters=word.text().split(''),selected=word.hasClass('is-visible');for(i in letters){if(word.parents('.rotate-2').length>0)letters[i]='<em>'+letters[i]+'</em>';letters[i]=(selected)?'<i class="in">'+letters[i]+'</i>':'<i>'+letters[i]+'</i>';}
var newLetters=letters.join('');word.html(newLetters).css('opacity',1);});}
function animateHeadline($headlines){var duration=animationDelay;$headlines.each(function(){var headline=$(this);if(headline.hasClass('loading-bar')){duration=barAnimationDelay;setTimeout(function(){headline.find('.cd-words-wrapper').addClass('is-loading')},barWaiting);}else if(headline.hasClass('clip')){var spanWrapper=headline.find('.cd-words-wrapper'),newWidth=spanWrapper.width()+10
spanWrapper.css('width',newWidth);}else if(!headline.hasClass('type')){var words=headline.find('.cd-words-wrapper b'),width=0;words.each(function(){var wordWidth=$(this).width();if(wordWidth>width)width=wordWidth;});headline.find('.cd-words-wrapper').css('width',width);};setTimeout(function(){hideWord(headline.find('.is-visible').eq(0))},duration);});}
function hideWord($word){var nextWord=takeNext($word);if($word.parents('.cd-headline').hasClass('type')){var parentSpan=$word.parent('.cd-words-wrapper');parentSpan.addClass('selected').removeClass('waiting');setTimeout(function(){parentSpan.removeClass('selected');$word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');},selectionDuration);setTimeout(function(){showWord(nextWord,typeLettersDelay)},typeAnimationDelay);}else if($word.parents('.cd-headline').hasClass('letters')){var bool=($word.children('i').length>=nextWord.children('i').length)?true:false;hideLetter($word.find('i').eq(0),$word,bool,lettersDelay);showLetter(nextWord.find('i').eq(0),nextWord,bool,lettersDelay);}else if($word.parents('.cd-headline').hasClass('clip')){$word.parents('.cd-words-wrapper').animate({width:'2px'},revealDuration,function(){switchWord($word,nextWord);showWord(nextWord);});}else if($word.parents('.cd-headline').hasClass('loading-bar')){$word.parents('.cd-words-wrapper').removeClass('is-loading');switchWord($word,nextWord);setTimeout(function(){hideWord(nextWord)},barAnimationDelay);setTimeout(function(){$word.parents('.cd-words-wrapper').addClass('is-loading')},barWaiting);}else{switchWord($word,nextWord);setTimeout(function(){hideWord(nextWord)},animationDelay);}}
function showWord($word,$duration){if($word.parents('.cd-headline').hasClass('type')){showLetter($word.find('i').eq(0),$word,false,$duration);$word.addClass('is-visible').removeClass('is-hidden');}else if($word.parents('.cd-headline').hasClass('clip')){$word.parents('.cd-words-wrapper').animate({'width':$word.width()+10},revealDuration,function(){setTimeout(function(){hideWord($word)},revealAnimationDelay);});}}
function hideLetter($letter,$word,$bool,$duration){$letter.removeClass('in').addClass('out');if(!$letter.is(':last-child')){setTimeout(function(){hideLetter($letter.next(),$word,$bool,$duration);},$duration);}else if($bool){setTimeout(function(){hideWord(takeNext($word))},animationDelay);}
if($letter.is(':last-child')&&$('html').hasClass('no-csstransitions')){var nextWord=takeNext($word);switchWord($word,nextWord);}}
function showLetter($letter,$word,$bool,$duration){$letter.addClass('in').removeClass('out');if(!$letter.is(':last-child')){setTimeout(function(){showLetter($letter.next(),$word,$bool,$duration);},$duration);}else{if($word.parents('.cd-headline').hasClass('type')){setTimeout(function(){$word.parents('.cd-words-wrapper').addClass('waiting');},200);}
if(!$bool){setTimeout(function(){hideWord($word)},animationDelay)}}}
function takeNext($word){return(!$word.is(':last-child'))?$word.next():$word.parent().children().eq(0);}
function takePrev($word){return(!$word.is(':first-child'))?$word.prev():$word.parent().children().last();}
function switchWord($oldWord,$newWord){$oldWord.removeClass('is-visible').addClass('is-hidden');$newWord.removeClass('is-hidden').addClass('is-visible');}
$('.button-collapse').sideNav({menuWidth:240,edge:'left',closeOnClick:true});$('.parallax').parallax();var card=document.querySelectorAll('.card-work');var transEndEventNames={'WebkitTransition':'webkitTransitionEnd','MozTransition':'transitionend','transition':'transitionend'},transEndEventName=transEndEventNames[Modernizr.prefixed('transition')];function addDashes(name){return name.replace(/([A-Z])/g,function(str,m1){return'-'+m1.toLowerCase();});}
function getPopup(id){return document.querySelector('.popup[data-popup="'+id+'"]');}
function getDimensions(el){return el.getBoundingClientRect();}
function getDifference(card,popup){var cardDimensions=getDimensions(card),popupDimensions=getDimensions(popup);return{height:popupDimensions.height/cardDimensions.height,width:popupDimensions.width/cardDimensions.width,left:popupDimensions.left-cardDimensions.left,top:popupDimensions.top-cardDimensions.top}}
function transformCard(card,size){return card.style[Modernizr.prefixed('transform')]='translate('+size.left+'px,'+size.top+'px)'+' scale('+size.width+','+size.height+')';}
function hasClass(elem,cls){var str=" "+elem.className+" ";var testCls=" "+cls+" ";return(str.indexOf(testCls)!=-1);}
function closest(e){var el=e.target||e.srcElement;if(el=el.parentNode)do{var cls=el.className;if(cls){cls=cls.split(" ");if(-1!==cls.indexOf("card-work")){return el;break;}}}while(el=el.parentNode);}
function scaleCard(e){var el=closest(e);var target=el,id=target.getAttribute('data-popup-id'),popup=getPopup(id);var size=getDifference(target,popup);target.style[Modernizr.prefixed('transitionDuration')]='0.5s';target.style[Modernizr.prefixed('transitionTimingFunction')]='cubic-bezier(0.4, 0, 0.2, 1)';target.style[Modernizr.prefixed('transitionProperty')]=addDashes(Modernizr.prefixed('transform'));target.style['borderRadius']=0;transformCard(target,size);onAnimated(target,popup);onPopupClick(target,popup);}
function onAnimated(card,popup){card.addEventListener(transEndEventName,function transitionEnded(){card.style['opacity']=0;popup.style['visibility']='visible';popup.style['zIndex']=9999;card.removeEventListener(transEndEventName,transitionEnded);});}
function onPopupClick(card,popup){popup.addEventListener('click',function toggleVisibility(e){var size=getDifference(popup,card);card.style['opacity']=1;card.style['borderRadius']='6px';hidePopup(e);transformCard(card,size);},false);}
function hidePopup(e){e.target.style['visibility']='hidden';e.target.style['zIndex']=2;}});})(jQuery);
// Questions for DC and Marvel categories
   // Questions for DC and Marvel categories
   const questions = {
    dc: [
        { question: "What is Batman's real name?", answer: "bruce wayne" },
        { question: "Who is Superman's arch-enemy?", answer: "lex luthor" },
        { question: "What is Wonder Woman's real name?", answer: "diana prince" },
        { question: "Who is the fastest man alive in DC Comics?", answer: "the flash" },
        { question: "What is the name of the island where Wonder Woman comes from?", answer: "themyscira" },
        { question: "Who is the butler of Bruce Wayne?", answer: "alfred pennyworth" },
        { question: "What is the real name of The Joker?", answer: "unknown" },
        { question: "Who is the Green Lantern of Sector 2814?", answer: "hal jordan" },
        { question: "What is the name of Aquaman's wife?", answer: "merra" },
        { question: "Who is the archenemy of Green Arrow?", answer: "merlyn" },
        { question: "What is the name of the DC Comics universe?", answer: "earth-one" },
        { question: "What is the real name of the villain Ra's al Ghul?", answer: "unknown" },
        { question: "What is the real name of The Riddler?", answer: "edward nygma" },
        { question: "What is the name of the company owned by Oliver Queen?", answer: "queen industries" },
        { question: "What is the real name of the villain Two-Face?", answer: "harvey dent" },
        { question: "Who is the enemy of the Teen Titans?", answer: "deathstroke" },
        { question: "What is the name of the city where Batman operates?", answer: "gotham city" },
        { question: "What is the real name of the villain Poison Ivy?", answer: "pamela isley" },
        { question: "Who is the first Robin?", answer: "dick grayson" },
        { question: "What is the name of Batman's utility belt?", answer: "bat-belt" }
    ],
    marvel: [
        { question: "What is Spider-Man's real name?", answer: "peter parker" },
        { question: "Who is Thor's brother?", answer: "loki" },
        { question: "What is the name of Tony Stark's company?", answer: "stark industries" },
        { question: "Who is the archenemy of Spider-Man?", answer: "green goblin" },
        { question: "What is the name of the X-Men's home base?", answer: "xavier's school for gifted youngsters" },
        { question: "What is Wolverine's real name?", answer: "james howlett" },
        { question: "Who is the founder of the X-Men?", answer: "professor x" },
        { question: "What is the name of the metal bonded to Wolverine's skeleton?", answer: "adamantium" },
        { question: "What is the real name of the villain Doctor Doom?", answer: "victor von doom" },
        { question: "Who is the leader of the Avengers?", answer: "captain america" },
        { question: "What is the name of the shield carried by Captain America?", answer: "vibranium shield" },
        { question: "What is the real name of the villain Magneto?", answer: "erik lehnsherr" },
        { question: "Who is the love interest of Peter Parker?", answer: "mary jane watson" },
        { question: "What is the name of the school attended by Peter Parker?", answer: "midtown high" },
        { question: "Who is the son of Odin and the rightful heir to the throne of Asgard?", answer: "thor" },
        { question: "What is the real name of the villain Thanos?", answer: "unknown" },
        { question: "Who is the mentor of Spider-Man?", answer: "iron man" },
        { question: "What is the name of the city where Daredevil operates?", answer: "hell's kitchen" },
        { question: "What is the real name of the villain Venom?", answer: "eddie brock" },
        { question: "Who is the love interest of Tony Stark?", answer: "pepper potts" }
    ]
};


    // Retrieve high scores from local storage for DC and Marvel categories
    let highScoresDC = JSON.parse(localStorage.getItem('highScoresDC')) || [];
    let highScoresMarvel = JSON.parse(localStorage.getItem('highScoresMarvel')) || [];

    // Function to fetch questions based on category
    function fetchQuestions(category) {
        const quizForm = document.getElementById("quizForm");
        quizForm.innerHTML = ""; // Clear previous questions

        const categoryQuestions = questions[category];
        categoryQuestions.forEach((q, index) => {
            const div = document.createElement("div");
            div.innerHTML = `
                <div>
                    <label for="q${index + 1}">${q.question}</label><br>
                    <input type="text" id="q${index + 1}" name="q${index + 1}" required>
                </div>
            `;
            quizForm.appendChild(div);
        });
    }

    // Function to update scoreboard for a specific category
    function updateScoreboard(category) {
        const scoreboard = document.getElementById("scoreboard");
        scoreboard.innerHTML = `<h2>${category.toUpperCase()} Scores</h2>`;
        const highScores = category === 'dc' ? highScoresDC : highScoresMarvel;
        const highScoresList = document.createElement("ol");
        highScores.forEach((score, index) => {
            const li = document.createElement("li");
            li.textContent = `${score.name}: ${score.score}`;
            highScoresList.appendChild(li);
        });
        scoreboard.appendChild(highScoresList);
    }

    // Function to submit form
    function submitForm() {
        // Calculate score
        let score = 0;
        const category = document.getElementById("category").value;
        const categoryQuestions = questions[category];
        for (let i = 0; i < categoryQuestions.length; i++) {
            const answer = document.getElementById("q" + (i + 1)).value.toLowerCase();
            if (answer === categoryQuestions[i].answer) {
                score++;
            }
        }

        // Get player name
        const playerName = prompt("Congratulations! You scored " + score + ". Enter your name:");

        // Add score to high scores for the selected category
        if (playerName) {
            const highScores = category === 'dc' ? highScoresDC : highScoresMarvel;
            highScores.push({ name: playerName, score: score });
            highScores.sort((a, b) => b.score - a.score);
            if (highScores.length > 5) {
                highScores.pop();
            }
            localStorage.setItem(category === 'dc' ? 'highScoresDC' : 'highScoresMarvel', JSON.stringify(highScores));
            updateScoreboard(category);
        }
    }

    // Listen for category selection
    document.getElementById("category").addEventListener("change", function() {
        const selectedCategory = this.value;
        fetchQuestions(selectedCategory);
        updateScoreboard(selectedCategory);
    });

    // Listen for form submission
    document.getElementById("submitBtn").addEventListener("click", function() {
        submitForm();
    });

    // Initial fetch of questions and update of scoreboard
    fetchQuestions('dc');
    updateScoreboard('dc');

    document.getElementById('category').addEventListener('change', function() {
        var indexBanner = document.getElementById('index-banner');
        var category = this.value;
    
        // Remove existing classes
        indexBanner.classList.remove('dc', 'marvel');
    
        // Add class based on selected category
        indexBanner.classList.add(category);
    });
    