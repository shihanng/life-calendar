# Life Calendar

[![Build and test](https://github.com/shihanng/life-calendar/workflows/Build%20and%20test/badge.svg)](https://github.com/shihanng/life-calendar/actions?query=workflow%3A%22Build+and+test%22+branch%3Amain)
[![codecov](https://codecov.io/gh/shihanng/life-calendar/branch/main/graph/badge.svg?token=7MfRJCIDNc)](https://codecov.io/gh/shihanng/life-calendar)

[Tim Urban](https://twitter.com/waitbutwhy) introduced the idea of life calendar in his talk titled [Inside the mind of master procrastinator](https://www.ted.com/talks/tim_urban_inside_the_mind_of_a_master_procrastinator). Each box in the calendar represents a week. Each row represents a year. The idea is to show us our own deadline and help us to stop procastinating.

Visit <https://life-calendar.shihan.dev/> to see it in action.

## Development

### Install dependencies

    yarn install

### Run local development

    yarn start

Then visit <http://localhost:3000/>.

### Run test with coverage

    yarn test --coverage --watchAll=false
