import captureWebsite from 'capture-website';

export default async function handler(req, res) {
  const { url } = req.query; // 从查询参数中获取 URL

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    // 捕获网站截图并返回 Base64 编码的图像
    const buffer = await captureWebsite.buffer(url, {
      fullPage: true,
      type: 'png',
    });

    // 将图像转换为 Base64
    const base64Image = buffer.toString('base64');
    res.setHeader('Content-Type', 'image/png');
    res.send(Buffer.from(base64Image, 'base64'));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to capture website' });
  }
}
