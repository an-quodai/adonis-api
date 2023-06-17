import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import ProductionOrder from 'App/Models/ProductionOrder'

export default class ProductionOrderFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof ProductionOrder, ProductionOrder>

  // public method (value: any): void {
  //   this.$query.where('name', value)
  // }
}
