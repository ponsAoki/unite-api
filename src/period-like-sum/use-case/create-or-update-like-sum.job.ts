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

  @Cron('0 0 */12 * * *')
  async handle(): Promise<void> {
    //likeテーブルを持つproductを全件取得する。
    const productsWithLikes = await this.productService.findAllIncludeLikes();
  
    // productsWithLikesが存在しない場合、処理を終了する
    if (productsWithLikes.length === 0) {
      return;
    }

    await Promise.all(
      // 一つずつproductを確認して既にlikeSumテーブルを持っているか確認する。
      //LikeSumが存在しない為新しくテーブル作成する。存在しない場合は更新
      productsWithLikes.map(async (product) => {
        const totalLikes = product.employeeToProductLikes.length;
        const specificId = product.periodLikeSum[0].id;

        await this.periodLikeSumService.upsert(product.id, totalLikes, specificId);
      })
    )
  }
}


