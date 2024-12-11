import NavSeller from '../../components/NavSeller'
import Footer from '../../components/Footer'
import SidebarSeller from '../../components/SidebarSeller'
import TopProduk from '../../components/seller/Produk/TopProduk'
import Produk from '../../components/seller/Produk/Produk'

const ProdukLayout = () => {
    return (
        <div className='bg-gray-100'>
            <NavSeller /> 
             <div className="flex flex-1 p-4 gap-4">
                <SidebarSeller className="w-1/4" /> 
                <div className="flex-1">

                <TopProduk />
                <Produk />
                </div>
            </div>
        
          <Footer />
        </div>
    );
};

export default ProdukLayout;
