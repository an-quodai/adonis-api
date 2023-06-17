import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import SaleOrderLine from 'App/Models/SaleOrderLine'

export default class SaleOrderLineFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof SaleOrderLine, SaleOrderLine>

  // public method (value: any): void {
  //   this.$query.where('name', value)
  // }
}
