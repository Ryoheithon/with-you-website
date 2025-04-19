import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-8">
          <nav className="flex flex-wrap justify-center gap-6">
            <Link href="/" className="text-sm text-gray-600 hover:text-[#6c63ff]">
              トップページ
            </Link>
            <Link href="/about" className="text-sm text-gray-600 hover:text-[#6c63ff]">
              ご挨拶
            </Link>
            <Link href="/for-parents" className="text-sm text-gray-600 hover:text-[#6c63ff]">
              保護者の方へ
            </Link>
            <Link href="/for-teachers" className="text-sm text-gray-600 hover:text-[#6c63ff]">
              学校の先生へ
            </Link>
            <Link href="/testimonials" className="text-sm text-gray-600 hover:text-[#6c63ff]">
              利用者の方の声
            </Link>
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-[#6c63ff]">
              料金表
            </Link>
            <Link href="/blog" className="text-sm text-gray-600 hover:text-[#6c63ff]">
              ブログ
            </Link>
            <Link href="/contact" className="text-sm text-gray-600 hover:text-[#6c63ff]">
              お問い合わせ
            </Link>
          </nav>
        </div>
        <div className="text-center text-sm text-gray-500">
          &copy; {currentYear} With-you. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
