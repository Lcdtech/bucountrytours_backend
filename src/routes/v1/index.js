const express = require('express');
const authRoute = require('./auth.route');
const emailRoute = require('./email.route');
const commonRoute = require('./common.route');
const taskRoute = require('./task.route');
const addPropertyRoute = require('./addProperty.route');
const whatsappRoute =require('./whatsapp.route')
const boardRoute = require('./board.route')
const boardListRoute = require('./boardList.route')
const permissionRoute = require('./permission.route')
const templateRoute = require('./template.route')
const mappingBoardGmailUserRoute = require('./mappingBoardGmailUser.route')
const userBoardRoute = require('./userBoard.route')
const groupUserRoute = require('./groupUser.route')
const groupBoardRoute = require('./groupBoard.route')
const ruleRoute = require('./rule.route')
const rolesRoute = require('./roles.route')
const usersRoute = require('./users.route')
const ka_inclusionsRoute = require('./ka_inclusions.route')
const ka_exclusionsRoute = require('./ka_exclusions.route');
const ka_themeRoute = require('./ka_theme.route')
const ka_categoriesRoute = require('./ka_categories.route')
const ka_destinationRoute = require('./ka_destination.route');
const productRoute = require('./product.route');
const ka_inclusionsGroupRoute = require('./ka_inclusionsGroup.route')
const ka_exclusionsGroupRoute = require('./ka_exclusionsGroup.route')
const ka_themeGroupRoute = require('./ka_themeGroup.route')
const ka_destinationsGroupRoute = require('./ka_destinationsGroup.route')
const ka_locationGroupRoute = require('./ka_locationGroup.route')
const ka_locationRoute = require('./ka_location.route')
const ka_ageRangeGroupRoute = require('./ka_ageRangeGroup.route')
const ka_ageRangeRoute = require('./ka_ageRange.route')
const ka_whatToBringGroupRoute = require('./ka_whatToBringGroup.route')
const ka_whatToBringRoute = require('./ka_whatToBring.route')
const ka_userGroupRoute = require('./ka_userGroup.route')
const ka_userRoute = require('./ka_user.route')
const ka_cancellationPolicieRoute = require('./ka_cancellationPolicie.route')
const ka_categoriesGroupRoute = require('./ka_categoriesGroup.route')
const testRoute = require('./test.route')
const testGroupRoute = require('./testGroup.route')
const ka_tripRoute = require('./ka_trip.route')
const accommodationRoute = require('./accommodation.route')
const ka_cancellationPolicieGroupRoute = require('./ka_cancellationPolicieGroup.route')
const credentailRoute = require('./credential.route')
const tokenRoute = require('./token.route');
const availabilityRoute = require('./availability.route')
const recurrenceRoute = require('./recurrence.route')
const dailyDepartureRoute = require('./dailyDeparture.route')
const stripeRoute = require('./stripe.route')
const bookingRoute = require('./booking.route')

const path = require('path');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/fetch',
    route: commonRoute
  },
  {
    path: '/email',
    route: emailRoute
  },
  {
    path: '/task',
    route: taskRoute
  },
  {
    path: '/addProperty',
    route: addPropertyRoute
  },
  {
    path: '/whatsapp',
    route: whatsappRoute
  },
  {
    path: '/board',
    route: boardRoute
  },
  {
    path: '/boardList',
    route: boardListRoute
  },
  {
    path: '/permission',
    route: permissionRoute
  },
  {
    path: '/template',
    route: templateRoute
  }
  ,
  {
    path: '/mappingBoardGmailUser',
    route: mappingBoardGmailUserRoute
  }
  ,
  {
    path: '/userBoard',
    route: userBoardRoute
  },
  {
    path: '/groupUser',
    route: groupUserRoute
  },
  {
    path: '/groupBoard',
    route: groupBoardRoute
  },
  {
    path: '/rule',
    route: ruleRoute,
  },
  {
    path: '/roles',
    route: rolesRoute,
  },
  {
    path: '/users',
    route: usersRoute,
  },
  {
    path: '/ka_inclusions',
    route: ka_inclusionsRoute
  },
  {
    path: '/ka_exclusions',
    route: ka_exclusionsRoute
  },
  {
    path: '/ka_theme',
    route: ka_themeRoute
  },
  {
    path: '/ka_categories',
    route: ka_categoriesRoute
  },
  {
    path: '/ka_destinations',
    route: ka_destinationRoute
  },
  {
    path: '/ka_inclusionsGroup',
    route: ka_inclusionsGroupRoute
  },
  {
    path: '/ka_exclusionsGroup',
    route: ka_exclusionsGroupRoute
  },
  {
    path: '/ka_themeGroup',
    route: ka_themeGroupRoute
  },
  {
    path: '/ka_destinationsGroup',
    route: ka_destinationsGroupRoute
  },
  {
    path: '/ka_locationGroup',
    route: ka_locationGroupRoute
  },
  {
    path: '/ka_location',
    route: ka_locationRoute
  },
  {
    path: '/product',
    route: productRoute
  },
  {
    path: '/ka_ageRangeGroup',
    route: ka_ageRangeGroupRoute
  },
  {
    path: '/ka_ageRange',
    route: ka_ageRangeRoute
  },
  {
    path: '/ka_whatToBringGroup',
    route: ka_whatToBringGroupRoute
  },
  {
    path: '/ka_whatToBring',
    route: ka_whatToBringRoute
  },
  {
    path: '/ka_userGroup',
    route: ka_userGroupRoute
  },
  {
    path: '/ka_user',
    route: ka_userRoute
  },
  {
    path: '/ka_cancellationPolicie',
    route: ka_cancellationPolicieRoute
  },
  {
    path: '/ka_categoriesGroup',
    route: ka_categoriesGroupRoute
  },
  {
    path: '/test',
    route: testRoute
  },
  {
    path: '/testGroup',
    route: testGroupRoute
  },
  {
    path: '/ka_trip',
    route: ka_tripRoute
  },
  {
    path: '/accommodation',
    route: accommodationRoute
  },
  {
    path: '/ka_cancellationPolicieGroup',
    route: ka_cancellationPolicieGroupRoute
  },
  {
    path: '/credentail',
    route: credentailRoute
  },
  {
    path: '/token',
    route: tokenRoute
  },
  {
    path: '/availability',
    route: availabilityRoute
  },
  {
    path: '/recurrence',
    route: recurrenceRoute
  },
  {
    path:'/dailyDeparture',
    route: dailyDepartureRoute
  },
  {
    path:'/create-payment-intent',
    route: stripeRoute
  },
  {
    path:'/booking',
    route: bookingRoute
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
