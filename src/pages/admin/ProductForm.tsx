import { useState, useEffect, type ReactElement, type ChangeEvent, type FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, createProduct, updateProduct } from '../../utils/productStorage';

const CATEGORIES = [
  { value: 'book', label: '도서 & 교육교재' },
  { value: 'ebook', label: '전자출판' },
  { value: 'periodical', label: '간행물' },
  { value: 'course', label: '강좌' },
];

interface FormState {
  slug: string;
  category: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  imageUrl: string;
  sortOrder: number;
  isSoldOut: boolean;
}

const ProductForm = (): ReactElement => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState<FormState>({
    slug: '',
    category: 'book',
    title: '',
    titleEn: '',
    description: '',
    descriptionEn: '',
    price: 0,
    imageUrl: '',
    sortOrder: 0,
    isSoldOut: false,
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      getProduct(Number(id)).then((p) => {
        if (p) {
          setForm({
            slug: p.slug || '',
            category: p.category || 'book',
            title: p.title || '',
            titleEn: p.titleEn || '',
            description: p.description || '',
            descriptionEn: p.descriptionEn || '',
            price: p.price || 0,
            imageUrl: p.imageUrl || '',
            sortOrder: p.sortOrder || 0,
            isSoldOut: p.isSoldOut || false,
          });
        }
        setLoading(false);
      });
    }
  }, [id, isEdit]);

  const handleChange = (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.slug) {
      setError('상품명과 slug는 필수입니다.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        sortOrder: Number(form.sortOrder),
      };
      if (isEdit && id) {
        await updateProduct(Number(id), payload);
      } else {
        await createProduct(payload);
      }
      navigate('/admin/products');
    } catch (err) {
      setError((err as Error).message || '저장에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="admin-loading"><div className="loading-spinner"></div></div>;
  }

  return (
    <>
      <div className="admin-page-header">
        <h1>{isEdit ? '상품 수정' : '상품 등록'}</h1>
        <p>{isEdit ? '기존 상품 정보를 수정합니다' : '새 상품을 등록합니다'}</p>
      </div>

      <div className="admin-table-card" style={{ padding: '28px' }}>
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>Slug *</label>
              <input type="text" value={form.slug} onChange={handleChange('slug')} placeholder="product-slug" required />
            </div>
            <div className="admin-form-group">
              <label>카테고리</label>
              <select value={form.category} onChange={handleChange('category')}>
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>상품명 (한국어) *</label>
              <input type="text" value={form.title} onChange={handleChange('title')} required />
            </div>
            <div className="admin-form-group">
              <label>상품명 (영어)</label>
              <input type="text" value={form.titleEn} onChange={handleChange('titleEn')} />
            </div>
          </div>

          <div className="admin-form-group">
            <label>설명 (한국어)</label>
            <textarea value={form.description} onChange={handleChange('description')} />
          </div>

          <div className="admin-form-group">
            <label>설명 (영어)</label>
            <textarea value={form.descriptionEn} onChange={handleChange('descriptionEn')} />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label>가격 (원)</label>
              <input type="number" value={form.price} onChange={handleChange('price')} min="0" />
            </div>
            <div className="admin-form-group">
              <label>정렬 순서</label>
              <input type="number" value={form.sortOrder} onChange={handleChange('sortOrder')} />
            </div>
          </div>

          <div className="admin-form-group">
            <label>이미지 URL</label>
            <input type="text" value={form.imageUrl} onChange={handleChange('imageUrl')} placeholder="https://..." />
            {form.imageUrl && (
              <img
                src={form.imageUrl}
                alt="Preview"
                style={{ maxWidth: '200px', marginTop: '8px', borderRadius: '8px' }}
              />
            )}
          </div>

          <div className="admin-form-checkbox">
            <input type="checkbox" id="isSoldOut" checked={form.isSoldOut} onChange={handleChange('isSoldOut')} />
            <label htmlFor="isSoldOut">품절 처리</label>
          </div>

          {error && <div className="edu-form-error">{error}</div>}

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="admin-btn admin-btn-secondary"
              onClick={() => navigate('/admin/products')}
            >
              취소
            </button>
            <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
              {saving ? '저장 중...' : (isEdit ? '수정' : '등록')}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ProductForm;
