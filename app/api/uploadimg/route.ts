import { console } from 'inspector';
import { NextRequest, NextResponse } from 'next/server';

const IMAGE_HOST = 'https://fc1fa495.shopping-telegraph-image.pages.dev';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    console.log(formData);
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: '未找到文件' }, { status: 400 });
    }

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    const response = await fetch(`${IMAGE_HOST}/upload`, {
      method: 'POST',
      body: uploadFormData,
    });

    const data = await response.json();
    
    if (data && data[0] && data[0].src) {
      return NextResponse.json({ 
        success: true, 
        url: `${IMAGE_HOST}${data[0].src}` 
      });
    }
    
    return NextResponse.json({ error: '上传失败' }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: '服务器错误' }, { status: 500 });
  }
}


