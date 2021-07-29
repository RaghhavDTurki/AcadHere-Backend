import { Document } from 'mongoose';
import { NoticeDb, NoticeInterface } from '../../models/NoticeSchema'

export async function paginateNoticeBoard(pageNumber: number,pageSize: number)
{
    
    let data: (NoticeInterface & Document<any, any, NoticeInterface>)[] = await NoticeDb.find();
    data = data.reverse();
    let maxPages: number = Math.ceil(data.length /  pageSize);
    if(pageNumber < 1)
    {
        pageNumber = 1;
    }
    
    if(pageNumber > maxPages)
    {
        pageNumber = maxPages;
    }

    let paginatedData: (NoticeInterface & Document<any, any, NoticeInterface>)[] = data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);

    return paginatedData;
}