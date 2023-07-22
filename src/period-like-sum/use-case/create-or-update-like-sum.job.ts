import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { ProductService } from "src/product/product.service";
import { PeriodLikeSumService } from "../period-like-sum.service";

@Injectable()
export class CreateOrUpdateLikeSumJob {
  constructor(
    private readonly productService: ProductService,
    private readonly periodLikeSumService: PeriodLikeSumService
   ) {}

  // @Cron('0 0 */12 * * *')
  @Cron('30 * * * * *')
  async handle(): Promise<void> {
    //likeテーブルを持つproductを全件取得する。
    console.log("30秒に一回job化")
    const productsWithLikes = await this.productService.findAllIncludeLikes();
  
    // productsWithLikesが存在しない場合、処理を終了する
    if (productsWithLikes.length === 0) {
      console.log("ないのでreturnします!!")
      return;
    }

    await Promise.all(
      // 一つずつproductを確認して既にlikeSumテーブルを持っているか確認する。
      //LikeSumが存在しない為新しくテーブル作成する。存在しない場合は更新
      productsWithLikes.map(async (product) => {
        const totalLikes = product.employeeToProductLikes.length;

        await this.periodLikeSumService.upsert(product.id, totalLikes, product.periodLikeSum[0].id);
      })
    )
  }
}


