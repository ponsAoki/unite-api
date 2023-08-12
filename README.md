# unite-api (「UNITE」の API リポジトリ)

## 環境構築

### Docker インストール (していない場合)

下記のドキュメントなどを参考に Docker デスクトップというアプリを PC 上にインストールお願いします。
https://docs.docker.com/desktop/install/mac-install/  
(「Docker Desktop for (OS 名)」ボタンを押して手順に沿ってインストールできると思います。)  
https://docs.docker.jp/docker-for-mac/install.html (mac)  
https://docs.docker.jp/desktop/windows/wsl.html (windows (WSL))

ターミナルを開いて、

```
docker -v
```

```
docker compose
```

などと打ってバージョン名やオプション一覧が出てきたら、無事インストールなど完了していると思います！

### リポジトリクローン

このリポジトリのクローンをお願いします。  
(クローンの方法がわからない場合: https://docs.github.com/ja/repositories/creating-and-managing-repositories/cloning-a-repository)

### コンテナのビルドや npm パッケージインストール

ターミナルで (クローンしたプロジェクトのルートディレクトリで)、

```
docker compose up -d
```

```
npm i
```

の２コマンドを打てば基本的に大丈夫だと思います。

### 動かしてみる

ターミナルで以下のコマンドを実行してみてください。  
・データベースのマイグレーション

```
npm run migrate
```

・prisma のインスタンス生成

```
npm run generate
```

※ 上記 2 つのコマンドは最新のブランチを取り込んだ際などにも必要に応じて実行してください。

・サーバーを起動してみる

```
npm run start
```

もしくは、ホットリロード可能な下記コマンドがおすすめ

```
npm run start:debug
```

### test してみる

・まずは、テスト用の DB のマイグレーションのために以下を実行ください。

```
npm run migrate:e2e
```

・e2e テスト

```
npm run test:e2e [テストファイル名を指定してもOK]
```

・unit テスト

```
npm run test:unit
```

...環境構築は以上で大体終了です。ざっくり書いているので、わからないところや不備がありましたらなんでもお聞きください 🙇

## 技術構成

NestJS / Prisma / MySQL / Docker / Railway (ホスティング)

## 設計・アーキテクチャ

設計は DDD (ドメイン駆動設計) を意識。(実践できていない点や適切でない点も多々あると思うので、知見のある方は遠慮なくご指摘いただけると幸いです 🙇)  
アーキテクチャは特に意識していないが、クリーンアーキテクチャ・レイヤードアーキテクチャあたりが近いのかも知れない

## リファレンス

### 公式ドキュメント

NestJS: https://docs.nestjs.com/  
Prisma: https://www.prisma.io/docs  
MySQL: https://dev.mysql.com/doc/  
Docker: https://docs.docker.com/  
Railway: https://docs.railway.app/
