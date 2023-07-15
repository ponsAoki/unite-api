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
import { FileInterceptor } from '@nestjs/platform-express';
import { FirebaseAuth } from 'src/common/decorators/auth.decorator';
import { UpdateProductService } from './use-case/update-product-service';
import { Product } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { createProductInput } from './dto/create-product-input';
import { UpdateProductInput } from './dto/update-product-input';
import { Request } from 'express';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CorporateAuthGuard } from 'src/common/guards/corporateAuth.guard';
import { EmployeeFirebaseAuth } from 'src/common/decorators/employeeAuth.decorator';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly createProduct: CreateProduct,
    private readonly updateProductService: UpdateProductService,
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
  @Get('findone/:id')
  async findOneById(@Param('id') id: string): Promise<Product> {
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

  //productの削除
  //ここはランキング機能を作る時に再利用されると困るため削除apiは準備していないです。

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

  //企業側(従業員)が一件取得する
  @Get('employee/findOne/:id')
  @UseGuards(CorporateAuthGuard)
  async findOne(
    @Param('id') id: string,
    @EmployeeFirebaseAuth() employee
  ) {
    //ここの処理はemployeeが取得できるか確認のためなのでマージする前に消します🙇‍♀️
    console.log("従業員情報を取得できているか確認する",employee)
  }
}
