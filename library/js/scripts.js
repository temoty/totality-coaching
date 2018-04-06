/*
 * Bones Scripts File
 * Author: Eddie Machado
 *
 * This file should contain any js scripts you want to add to the site.
 * Instead of calling it in the header or throwing it inside wp_head()
 * this file will be called automatically in the footer so as not to
 * slow the page load.
 *
 * There are a lot of example functions and tools in here. If you don't
 * need any of it, just remove it. They are meant to be helpers and are
 * not required. It's your world baby, you can do whatever you want.
 */


/*
 * Get Viewport Dimensions
 * returns object with viewport dimensions to match css in width and height properties
 * ( source: http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript )
 */
function updateViewportDimensions() {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth,
        y = w.innerHeight || e.clientHeight || g.clientHeight;
    return { width: x, height: y };
}
// setting the viewport width
var viewport = updateViewportDimensions();


/*
 * Throttle Resize-triggered Events
 * Wrap your actions in this function to throttle the frequency of firing them off, for better performance, esp. on mobile.
 * ( source: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed )
 */
var waitForFinalEvent = (function() {
    var timers = {};
    return function(callback, ms, uniqueId) {
        if (!uniqueId) { uniqueId = "Don't call this twice without a uniqueId"; }
        if (timers[uniqueId]) { clearTimeout(timers[uniqueId]); }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();

// how long to wait before deciding the resize has stopped, in ms. Around 50-100 should work ok.
var timeToWaitForLast = 100;


/*
 * Here's an example so you can see how we're using the above function
 *
 * This is commented out so it won't work, but you can copy it and
 * remove the comments.
 *
 *
 *
 * If we want to only do it on a certain page, we can setup checks so we do it
 * as efficient as possible.
 *
 * if( typeof is_home === "undefined" ) var is_home = $('body').hasClass('home');
 *
 * This once checks to see if you're on the home page based on the body class
 * We can then use that check to perform actions on the home page only
 *
 * When the window is resized, we perform this function
 * $(window).resize(function () {
 *
 *    // if we're on the home page, we wait the set amount (in function above) then fire the function
 *    if( is_home ) { waitForFinalEvent( function() {
 *
 *	// update the viewport, in case the window size has changed
 *	viewport = updateViewportDimensions();
 *
 *      // if we're above or equal to 768 fire this off
 *      if( viewport.width >= 768 ) {
 *        console.log('On home page and window sized to 768 width or more.');
 *      } else {
 *        // otherwise, let's do this instead
 *        console.log('Not on home page, or window sized to less than 768.');
 *      }
 *
 *    }, timeToWaitForLast, "your-function-identifier-string"); }
 * });
 *
 * Pretty cool huh? You can create functions like this to conditionally load
 * content and other stuff dependent on the viewport.
 * Remember that mobile devices and javascript aren't the best of friends.
 * Keep it light and always make sure the larger viewports are doing the heavy lifting.
 *
 */

/*
 * We're going to swap out the gravatars.
 * In the functions.php file, you can see we're not loading the gravatar
 * images on mobile to save bandwidth. Once we hit an acceptable viewport
 * then we can swap out those images since they are located in a data attribute.
 */
function loadGravatars() {
    // set the viewport using the function above
    viewport = updateViewportDimensions();
    // if the viewport is tablet or larger, we load in the gravatars
    if (viewport.width >= 768) {
        jQuery('.comment img[data-gravatar]').each(function() {
            jQuery(this).attr('src', jQuery(this).attr('data-gravatar'));
        });
    }
} // end function


/*
 * Put all your regular jQuery in here.
 */
jQuery(document).ready(function($) {

    /*
     * Let's fire off the gravatar function
     * You can remove this if you don't need it
     */
    loadGravatars();


});



/* Below is the JS code for the Hamburger mobile menu code */

// Look for .hamburger
var hamburger = document.querySelector(".hamburger");
var topNav = document.querySelector(".top-nav");
// On click
hamburger.addEventListener("click", function() {
    // Toggle class "is-active"
    hamburger.classList.toggle("is-active");
    topNav.classList.toggle("hidden-sm");
    // Do something else, like open/close menu
});

/* End of Hamburger mobile menu code */

/* Code for Vue.js Quiz App */


// Vue.component('final-score', {
//     inherit: true,
//     render(createElement) {

//         return createElement('h4', this.name)
//     },
//     data() {
//         return {
//             msg: 'Your fina score'
//         }
//     },
//     props: ['name']
// })

// const Finalscore = {
//     template: `<p>cats</p>`
// }


// const mycomp1 = {
//     template: `
//     <h1>cool {{yes()}}</h1>
//     `,
//     methods: {
//         yes() {
//             alert(app.catch);
//         }
//     }
// }


var app = new Vue({
    el: '#app',
    data: {
        // message: ''
        // counter: 0,
        questionCounter: 0,
        catch: 'heyy',
        quizScore: 0,
        styleObj: {
            color: 'blue'
        },
        viewnextpagebutton: true,
        viewlastbutton: false,
        questionSets: [{
                questionText: 'What time do you wake up in the morning?',
                questionChoices: [{
                        answerr: '5:00 AM',
                        letter: 'a',
                        score: 4
                    },
                    {
                        answerr: '5:30 AM',
                        letter: 'b',
                        score: 3
                    },
                    {
                        answerr: '6:00 AM',
                        letter: 'c',
                        score: 2
                    }
                ]
            },
            {
                questionText: 'Do you track the time it takes you to complete daily tasks?',
                questionChoices: [{
                        answerr: 'Yes',
                        letter: 'a',
                        score: 4
                    },
                    {
                        answerr: 'No',
                        letter: 'b',
                        score: 1
                    }
                ]
            },
            {
                questionText: 'This is the next question text?',
                questionChoices: [{
                        answerr: 'Some Choice',
                        letter: 'a',
                        score: 4
                    },
                    {
                        answerr: 'Some Other Choice',
                        letter: 'b',
                        score: 3
                    },
                    {
                        answerr: 'Some Other other Choice',
                        letter: 'c',
                        score: 2
                    }

                ]
            }
        ]

    },
    // components: {
    //     mycomp: mycomp1
    // },
    computed: {
        questionHeading: function() {
            return this.questionSets[this.questionCounter].questionText;
        },
        questionChoi: function() {
            return this.questionSets[this.questionCounter].questionChoices;
            //above i'll need a counter so each questionChoices changes when i click nextQuestion
        }

    },
    methods: {
        nextPage: function() {
            // this.counter++;
            let radios = document.getElementsByTagName('input');
            let scored;
            for (var i = 0; i < radios.length; i++) {
                if (radios[i].type === 'radio' && radios[i].checked) {
                    scored = parseInt(radios[i].value, 10);
                }
            }
            // let newQuizScore = this.quizScore + this.questionSets[this.questionCounter].questionChoices.checked.score;
            let newQuizScore = this.quizScore + scored;
            console.log(newQuizScore);
            this.quizScore = newQuizScore;
            console.log(this.quizScore);
            this.questionCounter++;
        },
        lastPage: function() {
            if (document.querySelector('.q_h1').innerHTML == this.questionSets[this.questionSets.length - 2].questionText) {
                this.viewlastbutton = true;
                this.viewnextpagebutton = false;
                console.log('lastPage triggered');
            }
        },
        submitQuiz: function() {

            let radios = document.getElementsByTagName('input');
            let scored;
            for (var i = 0; i < radios.length; i++) {
                if (radios[i].type === 'radio' && radios[i].checked) {
                    scored = parseInt(radios[i].value, 10);
                }
            }
            let newQuizScore = this.quizScore + scored;
            console.log(newQuizScore);
            this.quizScore = newQuizScore;
            console.log(this.quizScore);

            if (this.quizScore <= 8) {
                alert("Compared to others taking this quiz, your productivity is below average.  Click Here and Find out How to Immediately Improve Your Productivity");
            } else {
                alert("Wow, your productivity is higher than most people taking this test.  Click Here and Find out Why");
            }
        }
    }



});



// score: function() {
//     console.log('score triggered');
//     // let n_choices = 2;
//     // let score = 0;
//     // for (var i = 1; i <= n_choices.length; i++) {
//     //     let answers = document.getElementById('q' + i);

//     //         // for (var j = 0; j < answers.length; j++) {
//     //         //     if (answers[j].checked) {
//     //         //         score += +answers[j].value;
//     //         // break;
//     //     }
//     // }
//     // }
// }



/* End code for Vue.js Quiz */
/* end of as page load scripts */