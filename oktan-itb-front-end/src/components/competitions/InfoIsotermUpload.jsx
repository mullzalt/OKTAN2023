import React from 'react'

const InfoIsotermUpload = () => {
    return (
        <div className='pt-5 w-full lg:w-1/2 px-4'>
            <div className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <div className="card-title text-lg">
                        KETENTUAN KARYA DAN SISTEMATIKA PENULISAN
                    </div>
                    Ketentuan dan Sistem Penulisan Karya Tulis Ilmiah
                    <div className="ml-8">
                        <ol className="list-decimal">
                            <li>Karya abstraksi dan full-paper haruslah orisinal, tidak pernah dipublikasikan, tidak pernah memenangkan lomba lain, dan sedang tidak diikutsertakan pada lomba lain.</li>
                            <li className='mt-4'> Abstraksi dan full-paper ditulis dengan bahasa Indonesia mengikuti PUEBI (Pedoman Umum Ejaan Bahasa Indonesia).
                            </li>
                            <li className='mt-4'>Abstraksi dan full-paper ditulis dengan font Times New Roman 12 pt dengan spasi 1.15, margin kiri 3 cm, serta margin atas, bawah, kanan 2 cm.</li>
                            <li className='mt-4'>Abstraksi terdiri atas maksimal 300 kata dengan 3-5 kata kunci. Abstraksi menjelaskan latar belakang, metode penelitian, hasil, dan kesimpulan. Format abstraksi dapat diakses pada KIT ISOTERM: <a href='https://bit.ly/KITISOTERM2023' target={"_blank"} className='inline-block link link-primary'>https://bit.ly/KITISOTERM2023</a>
                            </li>
                            <li className='mt-4'>Full-paper terdiri atas maksimal 15 halaman dengan sistematika penulisan sesuai dengan format full-paper yang dapat diakses pada KIT ISOTERM.</li>
                            <li className='mt-4'>Full-paper harus melampirkan lembar orisinalitas dan lembar pengesahan dengan format yang dapat diakses pada KIT ISOTERM.
                            </li>
                            <li className='mt-4'>Full-paper harus memiliki tingkat plagiarisme pada rentang 20 - 25%.</li>
                        </ol>
                    </div>
                    <div className="card-title text-lg mt-4">
                        KRITERIA PENILAIAN
                    </div>
                    → Abstrak
                    <div className="ml-8">
                        <ol className="list-decimal">
                            <li>Kreativitas dan inovasi (40%)</li>
                            <li className='mt-2'>Kesesuaian dengan tema (30%)
                            </li>
                            <li className='mt-2'>Orisinalitas karya (20%)</li>
                            <li className='mt-2'>Sistematika penulisan (10%)
                            </li>
                        </ol>
                    </div>
                    → Karya Tulis
                    <div className="ml-8">
                        <ol className="list-decimal">
                            <li>Kreativitas inovasi (35%)</li>
                            <li className='mt-2'>Hasil dan pembahasan (35%)
                            </li>
                            <li className='mt-2'>Keabsahan data dan teori pendukung (20%)</li>
                            <li className='mt-2'>Sistematika penulisan (10%)
                            </li>
                        </ol>
                    </div>
                    → Final
                    <div className="ml-8">
                        <ol className="list-decimal">
                            <li>Kriteria penilaian tahap final akan diinformasikan pada technical meeting.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoIsotermUpload