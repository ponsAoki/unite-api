import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProduct } from './use-case/create-product';
import { FirebaseAuth } from 'src/common/decorators/auth.decorator';
import { Product } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { createProductInput } from './dto/create-product-input';
import { UpdateProductInput } from './dto/update-product-input';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { UpdateProduct } from './use-case/update-product';
import { FileInterceptor } from '@nestjs/platform-express';
import { CorporateAuthGuard } from 'src/common/guards/corporate-auth.guard';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly createProduct: CreateProduct,
    private readonly updateProductService: UpdateProduct,
    private readonly userService: UserService,
  ) {}

  @Get()
  async findMany(): Promise<Product[]> {
    return await this.productService.findMany();
  }

  //自分が作成したプロダクトを一覧取得
  @Get('my-products')
  @UseGuards(AuthGuard)
  async findMyProducts(@FirebaseAuth() authUser: any): Promise<Product[]> {
    const user = await this.userService.findByFirebaseUID(authUser.uid);
    return await this.productService.findMyProducts(user.id);
  }

  //自分が関連しているプロダクトを一覧取得
  @Get('find-related-products')
  @UseGuards(AuthGuard)
  async findRelatedProducts(@FirebaseAuth() authUser: any): Promise<Product[]> {
    const user = await this.userService.findByFirebaseUID(authUser.uid);
    return await this.productService.findRelatedProducts(user.id);
  }

  // 一件取得
  @Get('findOne/:id')
  @UseGuards(AuthGuard)
  async findOneById(@Param('id') id: string): Promise<Product> {
    return await this.productService.findOne(id);
  }

  @Get('findOne/corporation/:id')
  @UseGuards(CorporateAuthGuard)
  async findOneByIdAndCorporationAuth(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  //情報の編集
  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @FirebaseAuth() authUser: any,
    @Param('id') id: string,
    @UploadedFile() file?: Express.Multer.File,
    @Body() input?: UpdateProductInput,
  ): Promise<Product> {
    return this.updateProductService.handle(id, input, file);
  }

  //Productの作成
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() input: createProductInput,
  ): Promise<Product> {
    //use-caseでimageをfirebaseStorageに登録する処理に移る
    return await this.createProduct.handle(file, input);
  }

  //productの削除
  //ここはランキング機能を作る時に再利用されると困るため削除apiは準備していないです。
}
