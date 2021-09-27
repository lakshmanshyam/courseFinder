import { Module, OnModuleInit } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './search.service';

@Module({
    imports: [ElasticsearchModule.registerAsync({
        useFactory: async () => ({
            node: 'http://127.0.0.1:9200'
        })
    })],
    exports: [SearchService],
    providers: [SearchService],
})
export class SearchModule implements OnModuleInit{

    constructor(private readonly searchService: SearchService){}

    public async onModuleInit(){
        this.searchService.createIndex();
    }
}
