# Landrup Dans

### Student: Kim Pedersen

#### [Repository](https://github.com/rts-cmk-wu07/svendeprove-Howtoad) | [scrum-board](https://github.com/orgs/rts-cmk-wu07/projects/18) | [automated deployment](https://svendeprove-howtoad.vercel.app/) | [deployed api](https://landrupapi.onrender.com/)

# Installation

```
Npm i
Npm run start
```

# Tech-stack

## [React](https://react.dev/) | _Alternative_: [Angular](https://angular.io/)

### The application is written in react. React allows me to split my project into **reuseable components**, greatly **decreasing production time** the longer a project goes on.

## [React-Icons](https://react-icons.github.io/react-icons/) | _Alternative_: [feather-icons](https://feathericons.com/)

### As **requested by the design**, a couple of icons are required. I chose to use react-icons as it allows me to quickly import **icons as components**, from a very **large library**.

## [React-router-dom](https://www.npmjs.com/package/react-router-dom) | _Alternative_: [Reach-router](https://reach.tech/router/)

### A **routing library** for react applicaitons. It enables me to **set up routes and dictate what components should be loaded** on said routes. In this specific case it was also used to set up 1 **protected route**.

## [react-toastify](https://www.npmjs.com/package/react-toastify) | _Alternative_: [Mui snackbar](https://mui.com/material-ui/react-snackbar/)

### A great way to give **feedback** to the user upon user input. Displays a pop-in message, in which i can dictate anything from **color to icon to context of the message**.

## [react-use-cookie](https://www.npmjs.com/package/react-use-cookie) | _Alternative_: [js-cookie](https://github.com/js-cookie/js-cookie)

### Allows me to easily **create and manipulate cookies**. In this case dictating the time before it expires.

## [Axios](https://axios-http.com/docs/intro) | _Alternative_: [Fetch api](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

### Used for **making requests** to the api and **manipulaitng the data received back** from the request. Also has the added benefit of being **backwards compatiable** to ancient browsers like internet explorer 11.

## [Framer-motion](https://www.framer.com/motion/) | _Alternative_: [React-spring](https://www.react-spring.dev/)

### a library used for **animations**. It provides a very **easy to use** api for creating animations, transitions etc.

## [Tailwind](https://tailwindcss.com/docs/guides/create-react-app) | _Alternative_ [bootstrap](https://getbootstrap.com/)

### Tailwind is used throughout the project to define text sizes, colors, fonts etc. It allows me to standardize design choices to easily keep a consistent theme on the site.

# [Code example](https://github.com/rts-cmk-wu07/svendeprove-Howtoad/blob/main/src/views/Activitydetail.js)

## On the site we have 2 types of users. Default and Instructors. To allow only the default users to join a dance class, I chose to only render the button to send the request to do so, if you're logged in as default user.

## I also check for a couple of more things once the default user clicks the button.

1. Firstly i check if my state "joined" is true, and if it is and the user clicks the button, "userleave" will be called.
2. Then i do a check for if the date stored in the class is the same as my "getDayOfWeek" function. If it is and user clicks the button "dayError" will be called
3. If none of the above conditions are met, and the user clicks the button, "userJoin" will be called, enabling the user to send a post request to join the class.
4. The button's content will swap between "Forlad / Tilmeld", dependent on the state of "joined"

```{token && token.role === "default" && (
              <>
                {data.weekday && (
                  <button
                    className={`buttonStyle absolute right-7 bottom-5`}
                    onClick={
                      joined
                        ? userLeave
                        : data.weekday === getDayOfWeek()
                        ? dayError
                        : userJoin
                    }
                  >
                    {joined ? "Forlad" : "Tilmeld"}
                  </button>
                )}
              </>
            )}
```

# Code example to dicuss

```
const userJoin = async () => {
    try {
      const userResponse = await axios.get(
        `http://localhost:4000/api/v1/users/${token.userId}`,
        {
          headers: { Authorization: `Bearer ${token.token}` },
        }
      );
      const userAge = userResponse.data.age;

      if (userAge >= data.minAge && userAge <= data.maxAge) {
        await axios.post(
          `http://localhost:4000/api/v1/users/${token.userId}/activities/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${token.token}` },
          }
        );
        setJoined(true);
        toast.success(`Vi ses på ${data.weekday}!`);
      } else {
        toast.error("Din alder er udenfor aldersgrænsen for denne aktivitet");
      }
    } catch (error) {
      console.error("Error enrolling user:", error);
    }
  };
```

# Scalability

## All content the user interacts with is pulled from the api and built in a way to support future additions of dance classes, users etc. The code is built with reuseable components, and if the product is to become much larger, all axios requests can be codesplit into hooks for easier maintenance. If data fails to load the user is met with adequate error messages.

# Design changes

## The design lacked a way to navigate to the login page. So I chose to change the calendar icon to a login icon, when the user isnt logged in. Once the user is logged in, a log out icon will appear in the top right side of the site.
