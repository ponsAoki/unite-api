import { Injectable } from "@nestjs/common";
import { ProductService } from "src/product/product.service";

@Injectable()
export class CheckForMyComment {
  constructor(
    private readonly productService: ProductService,
  ) {}

  async handle(id: string, userId: string) {
    let isMyCommentExist = false
    const product = await this.productService.findOne(id);
    const comments = product.comment;
    for(let i = 0; i < comments.length; i++) {
      if (comments[i].userId === userId) {
        isMyCommentExist = true;
        break
      }
    }
    if (!isMyCommentExist) return;

    throw new Error("commentはすでに存在している為作成することができません。")
  }
}
