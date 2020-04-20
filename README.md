# Typing-Royale

## Description

A retro themed typing game that allows players to compete head to head over the web.

## Table of Contents

- [Typing-Royale](#typing-royale)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Motivation](#motivation)
  - [Demo](#demo)
  - [Screenshots](#screenshots)
  - [Technologies](#technologies)
    - [Front-End](#front-end)
    - [Back-End](#back-end)
  - [Installation](#installation)
  - [Contributing](#contributing)
  - [License](#license)

## Motivation

Inspired by single-player typing websites, Typing Royale was created to settle, once and for all, who is the fastest typist in the office. Sure, you can take individual typing tests and compare results, but where is the fun in that? A live, head to head, adrenaline-pumping battle with all bragging rights on the line? Now *that's* is a true typing test. Good luck, and may the fastest typist win 🏆🏆🏆.

## Demo

![Typing-Royale game gif](https://i.imgur.com/eEvdXsb.gif)

## Screenshots

![Typing-Royale Homepage](https://i.imgur.com/QXsQMMZ.png)
![Typing Royale Challenge](https://i.imgur.com/F40B0i0.png)
![Typing Royale Win](https://i.imgur.com/F40B0i0.png)

## Technologies

### Front-End

- Framework
  - [React](https://reactjs.org/)
- State Management
  - [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- Routing
  - [React Router](https://www.npmjs.com/package/react-router-dom)
- User Interface
  - [NES CSS](https://nostalgic-css.github.io/NES.css/)

### Back-End

[Link to Back-End Repo](https://github.com/wukrit/typing-royale-backend)

- API
  - [Ruby on Rails](https://rubyonrails.org/)
  - [Active Model Serializer](https://github.com/rails-api/active_model_serializers)
- Database
  - [PostgreSQL](https://www.postgresql.org/)
- Authorization/Authentication
  - [JWT](https://jwt.io/)
  - [BCrypt](https://rubygems.org/gems/bcrypt/versions/3.1.12)
- Web Sockets
  - [Action Cable](https://guides.rubyonrails.org/action_cable_overview.html)

Typing-Royale's API is built with Ruby on Rails, utilizing JWT and BCrypt for security, and PostgreSQL for its database. ActionCable is utilized to allow for real-time progress updates between players.

## Installation

    Clone the repo and CD inside the directory
    npm install
    npm start

Make sure to visit the repo for the backend and follow those instructions as well.

## Contributing

Pull requests are always welcome! Please make sure that your PR is [well-scoped](https://www.netlify.com/blog/2020/03/31/how-to-scope-down-prs/).

<table>
  <tr>
    <td align="center"><a href="http://shanelonergan.dev/"><img src="https://avatars2.githubusercontent.com/u/52255508?s=400&u=ca705fb2292c36027735a9b012b720a0ce869649&v=4" width="200px;" alt=""/><br /><sub><b>Shane Lonergan</b></sub></a><br /><a href="https://github.com/wukrit/typing-royale-frontend/commits?author=shanelonergan" title="Code">💻</a> <a href="#infra-shanelonergan" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/wukrit/typing-royale-frontend/issues/created_by/shanelonergan" title="Bug reports">🐛</a><a href="#ideas-shanelonergan" title="Ideas, Planning, & Feedback">💡</a></td>
    <td></td>
    <td align="center"><a href="http://sukritwalia.com/"><img src="https://avatars2.githubusercontent.com/u/38337521?s=460&u=afce3b9688ccf5a6acfe2da752c572a3a0db8b1a&v=4" width="200px;" alt=""/><br /><sub><b>Sukrit Walia</b></sub></a><br /><a href="https://github.com/wukrit/typing-royale-frontend/commits?author=wukrit" title="Code">💻</a> <a href="#infra-wukrit" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/wukrit/typing-royale-frontend/issues/created_by/wukrit" title="Bug reports">🐛</a><a href="#ideas-wukrit" title="Ideas, Planning, & Feedback">💡</a></td>
    </tr>
</table>

## License

[MIT](https://choosealicense.com/licenses/mit/) © [Shane Lonergan](https://github.com/shanelonergan/) & [Sukrit Walia](https://github.com/wukrit/)
