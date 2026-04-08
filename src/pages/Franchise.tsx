import { useState, type ReactElement, type ChangeEvent, type FormEvent } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import SEOHead from '../components/SEOHead';
import useAOS from '../hooks/useAOS';
import getSupabase from '../utils/supabase';
import site from '../config/site';

const Franchise = (): ReactElement => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', preferred_site: '', experience: '', motivation: '', portfolio_url: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      const client = getSupabase();
      if (!client) { await new Promise((r) => setTimeout(r, 1000)); setSuccess(true); return; }
      const payload: Record<string, unknown> = { ...form };
      if (user?.id) payload.user_id = user.id;
      if (!payload.portfolio_url) delete payload.portfolio_url;
      const { error: insertError } = await client.from('biz_franchise_applications').insert(payload);
      if (insertError) throw insertError;
      setSuccess(true);
    } catch (err: unknown) {
      console.error('Franchise submit error:', err);
      setError(t('site.franchise.formError') as string);
    } finally { setSubmitting(false); }
  };

  useAOS();

  const benefits = [
    { icon: 'fa-solid fa-palette', titleKey: 'benefit1Title', descKey: 'benefit1Desc' },
    { icon: 'fa-solid fa-box-open', titleKey: 'benefit2Title', descKey: 'benefit2Desc' },
    { icon: 'fa-solid fa-wrench', titleKey: 'benefit3Title', descKey: 'benefit3Desc' },
    { icon: 'fa-solid fa-chalkboard-user', titleKey: 'benefit4Title', descKey: 'benefit4Desc' },
  ];

  return (
    <>
      <SEOHead title={t('site.franchise.title')} description={t('site.franchise.subtitle')} path="/franchise" />

      <section className="page-header">
        <div className="container">
          <h2>{t('site.franchise.title')}</h2>
          <p>{t('site.franchise.subtitle')}</p>
        </div>
      </section>

      <section className="edu-benefits-section">
        <div className="container">
          <h3 className="section-title text-center">{t('site.franchise.benefitsTitle')}</h3>
          <div className="edu-benefits-grid">
            {benefits.map((b, i) => (
              <div key={i} className="edu-benefit-card" data-aos="fade-up" data-aos-delay={i * 100}>
                <span className="edu-benefit-icon"><i className={b.icon}></i></span>
                <h4>{t(`site.franchise.${b.titleKey}`)}</h4>
                <p>{t(`site.franchise.${b.descKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="edu-form-section" data-aos="fade-up">
        <div className="container">
          <div className="edu-form-wrapper">
            <h3>{t('site.franchise.formTitle')}</h3>
            {success ? (
              <div className="edu-form-success">
                <span className="edu-form-success-icon"><i className="fa-solid fa-circle-check"></i></span>
                <h4>{t('site.franchise.formSuccess')}</h4>
                <p>{t('site.franchise.formSuccessDesc')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="edu-form">
                <div className="edu-form-row">
                  <div className="edu-form-group">
                    <label>{t('site.franchise.formName')}</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder={t('site.franchise.formNamePh') as string} required />
                  </div>
                  <div className="edu-form-group">
                    <label>{t('site.franchise.formEmail')}</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder={t('site.franchise.formEmailPh') as string} required />
                  </div>
                </div>
                <div className="edu-form-row">
                  <div className="edu-form-group">
                    <label>{t('site.franchise.formPhone')}</label>
                    <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder={t('site.franchise.formPhonePh') as string} required />
                  </div>
                  <div className="edu-form-group">
                    <label>{t('site.franchise.formSite')}</label>
                    <select name="preferred_site" value={form.preferred_site} onChange={handleChange} required>
                      <option value="">{t('site.franchise.formSiteSelect')}</option>
                      {site.learningSites.map((ls) => (
                        <option key={ls.id} value={ls.id}>{language === 'en' ? ls.nameEn : ls.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="edu-form-group">
                  <label>{t('site.franchise.formExperience')}</label>
                  <textarea name="experience" value={form.experience} onChange={handleChange} placeholder={t('site.franchise.formExperiencePh') as string} rows={3} required />
                </div>
                <div className="edu-form-group">
                  <label>{t('site.franchise.formMotivation')}</label>
                  <textarea name="motivation" value={form.motivation} onChange={handleChange} placeholder={t('site.franchise.formMotivationPh') as string} rows={4} required />
                </div>
                <div className="edu-form-group">
                  <label>{t('site.franchise.formPortfolio')}</label>
                  <input type="url" name="portfolio_url" value={form.portfolio_url} onChange={handleChange} placeholder={t('site.franchise.formPortfolioPh') as string} />
                </div>
                {error && <p className="edu-form-error">{error}</p>}
                <button type="submit" className="btn btn-primary edu-form-submit" disabled={submitting}>
                  {submitting ? t('site.franchise.formSubmitting') : t('site.franchise.formSubmit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Franchise;
