import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Partner from 'App/Models/Partner'

export default class PartnerFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Partner, Partner>

  // public method (value: any): void {
  //   this.$query.where('name', value)
  // }
}
