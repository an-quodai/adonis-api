import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import SaleOrder from 'App/Models/SaleOrder'

export default class SaleOrderFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof SaleOrder, SaleOrder>

  // public method (value: any): void {
  //   this.$query.where('name', value)
  // }
}
