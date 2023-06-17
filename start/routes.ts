/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import Env from '@ioc:Adonis/Core/Env'

Route.get('/', () => {
  return { hello: 'world' }
})
Route.group(() => {
  Route.resource('items', 'ItemsController').apiOnly()
  Route.resource('partners', 'PartnersController').apiOnly()

  Route.group(() => {
    Route.get('/', 'SaleOrdersController.index')
    Route.get('/:id', 'SaleOrdersController.show')
    Route.get('/:id/lines', 'SaleOrderLinesController.getNoProductionSaleLines')
    Route.post('/', 'SaleOrdersController.store')
    Route.put('/:id', 'SaleOrdersController.update')
    Route.delete('/:id', 'SaleOrdersController.destroy')
  }).prefix('/sale-orders')

  Route.group(() => {
    Route.get('/', 'ProductionOrdersController.index')
    Route.get('/:id', 'ProductionOrdersController.show')
    Route.post('/', 'ProductionOrdersController.store')
    Route.post('/from-sale', 'ProductionOrdersController.createFromSale')
    Route.put('/:id', 'ProductionOrdersController.update')
    Route.delete('/:id', 'ProductionOrdersController.destroy')
  }).prefix('/production-orders')
}).prefix('/api')

Route.group(() => {
  Route.post('/register', 'AuthController.register')
  Route.post('/login', 'AuthController.login')
  Route.get('/logout', 'AuthController.logout')
  Route.get('/', 'AuthController.index')
}).prefix('/auth')

Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

if (Env.get('IPX_ENABLED')) Route.get('/image/*', 'ImagesController.index')
