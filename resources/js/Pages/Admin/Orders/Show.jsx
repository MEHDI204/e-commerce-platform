import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Package, DollarSign, MapPin, CreditCard, Calendar, User, Mail, Phone, Edit3, Save, X, Check, AlertCircle } from 'lucide-react';

export default function Show({ order }) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        order_status: order.order_status,
        payment_status: order.payment_status,
        notes: order.notes || '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        router.patch(
            route('admin.orders.update-status', order.id),
            formData,
            {
                onSuccess: () => {
                    setIsEditing(false);
                    setIsSubmitting(false);
                },
                onError: () => {
                    setIsSubmitting(false);
                },
            }
        );
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            processing: 'bg-blue-100 text-blue-800',
            shipped: 'bg-purple-100 text-purple-800',
            delivered: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getPaymentStatusColor = (status) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            paid: 'bg-green-100 text-green-800',
            failed: 'bg-red-100 text-red-800',
            refunded: 'bg-gray-100 text-gray-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <AuthenticatedLayout>
            <Head title={`Order ${order.order_number}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <Link
                                        href={route('admin.orders.index')}
                                        className="text-gray-600 hover:text-gray-900 inline-flex items-center gap-2"
                                    >
                                        <ArrowLeft className="h-4 w-4" />
                                        Back to Orders
                                    </Link>
                                    <h1 className="text-2xl font-semibold text-gray-900">
                                        Order {order.order_number}
                                    </h1>
                                </div>
                                {!isEditing && (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        <Edit3 className="h-4 w-4" />
                                        Update Status
                                    </button>
                                )}
                            </div>

                            {/* Order Status Form */}
                            {isEditing && (
                                <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Order Status
                                                </label>
                                                <select
                                                    value={formData.order_status}
                                                    onChange={(e) => setFormData({ ...formData, order_status: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Payment Status
                                                </label>
                                                <select
                                                    value={formData.payment_status}
                                                    onChange={(e) => setFormData({ ...formData, payment_status: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="paid">Paid</option>
                                                    <option value="failed">Failed</option>
                                                    <option value="refunded">Refunded</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Notes
                                                </label>
                                                <textarea
                                                    value={formData.notes}
                                                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                                    rows={1}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    placeholder="Add notes..."
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
                                            >
                                                <Save className="h-4 w-4" />
                                                {isSubmitting ? 'Saving...' : 'Save Changes'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsEditing(false);
                                                    setFormData({
                                                        order_status: order.order_status,
                                                        payment_status: order.payment_status,
                                                        notes: order.notes || '',
                                                    });
                                                }}
                                                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                                            >
                                                <X className="h-4 w-4" />
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Order Details */}
                                <div className="lg:col-span-2 space-y-6">
                                    {/* Status Overview */}
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h2>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-600">Order Status</p>
                                                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.order_status)}`}>
                                                    {order.order_status}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Payment Status</p>
                                                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getPaymentStatusColor(order.payment_status)}`}>
                                                    {order.payment_status}
                                                </span>
                                            </div>
                                        </div>
                                        {order.notes && (
                                            <div className="mt-4">
                                                <p className="text-sm text-gray-600">Notes</p>
                                                <p className="text-gray-900">{order.notes}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Order Items */}
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
                                        <div className="bg-gray-50 rounded-lg overflow-hidden">
                                            <table className="min-w-full">
                                                <thead className="bg-gray-100">
                                                    <tr>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Product
                                                        </th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Quantity
                                                        </th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Unit Price
                                                        </th>
                                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Total
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">
                                                    {order.items.map((item) => (
                                                        <tr key={item.id}>
                                                            <td className="px-4 py-4">
                                                                <div className="flex items-center gap-3">
                                                                    {item.product?.primary_image && (
                                                                        <img
                                                                            src={`/storage/products/${item.product.primary_image.image_path}`}
                                                                            alt={item.product.name}
                                                                            className="h-12 w-12 object-cover rounded"
                                                                        />
                                                                    )}
                                                                    <div>
                                                                        <p className="font-medium text-gray-900">
                                                                            {item.product?.name || 'Product not found'}
                                                                        </p>
                                                                        <p className="text-sm text-gray-500">
                                                                            SKU: {item.product?.sku || 'N/A'}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-4 py-4 text-gray-900">
                                                                {item.quantity}
                                                            </td>
                                                            <td className="px-4 py-4 text-gray-900">
                                                                ${item.unit_price.toFixed(2)}
                                                            </td>
                                                            <td className="px-4 py-4 font-medium text-gray-900">
                                                                ${item.total_price.toFixed(2)}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* Addresses */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Shipping Address */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                <MapPin className="h-5 w-5" />
                                                Shipping Address
                                            </h3>
                                            {order.shipping_address ? (
                                                <div className="bg-gray-50 rounded-lg p-4">
                                                    <p className="font-medium text-gray-900">
                                                        {order.shipping_address.first_name} {order.shipping_address.last_name}
                                                    </p>
                                                    <p className="text-gray-600">{order.shipping_address.address_line_1}</p>
                                                    {order.shipping_address.address_line_2 && (
                                                        <p className="text-gray-600">{order.shipping_address.address_line_2}</p>
                                                    )}
                                                    <p className="text-gray-600">
                                                        {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.postal_code}
                                                    </p>
                                                    <p className="text-gray-600">{order.shipping_address.country}</p>
                                                    {order.shipping_address.phone && (
                                                        <p className="text-gray-600">{order.shipping_address.phone}</p>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="bg-gray-50 rounded-lg p-4 text-gray-500">
                                                    No shipping address provided
                                                </div>
                                            )}
                                        </div>

                                        {/* Billing Address */}
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                                <CreditCard className="h-5 w-5" />
                                                Billing Address
                                            </h3>
                                            {order.billing_address ? (
                                                <div className="bg-gray-50 rounded-lg p-4">
                                                    <p className="font-medium text-gray-900">
                                                        {order.billing_address.first_name} {order.billing_address.last_name}
                                                    </p>
                                                    <p className="text-gray-600">{order.billing_address.address_line_1}</p>
                                                    {order.billing_address.address_line_2 && (
                                                        <p className="text-gray-600">{order.billing_address.address_line_2}</p>
                                                    )}
                                                    <p className="text-gray-600">
                                                        {order.billing_address.city}, {order.billing_address.state} {order.billing_address.postal_code}
                                                    </p>
                                                    <p className="text-gray-600">{order.billing_address.country}</p>
                                                    {order.billing_address.phone && (
                                                        <p className="text-gray-600">{order.billing_address.phone}</p>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="bg-gray-50 rounded-lg p-4 text-gray-500">
                                                    No billing address provided
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Sidebar */}
                                <div className="space-y-6">
                                    {/* Customer Info */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <User className="h-5 w-5" />
                                            Customer Information
                                        </h3>
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <p className="font-medium text-gray-900">{order.customer.name}</p>
                                            <div className="mt-2 space-y-1">
                                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                                    <Mail className="h-4 w-4" />
                                                    {order.customer.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Order Summary */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <DollarSign className="h-5 w-5" />
                                            Order Summary
                                        </h3>
                                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Subtotal</span>
                                                <span className="font-medium">${order.subtotal.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Tax</span>
                                                <span className="font-medium">${order.tax_amount.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Shipping</span>
                                                <span className="font-medium">${order.shipping_amount.toFixed(2)}</span>
                                            </div>
                                            <div className="border-t pt-3">
                                                <div className="flex justify-between">
                                                    <span className="text-lg font-semibold">Total</span>
                                                    <span className="text-lg font-semibold">${order.total_amount.toFixed(2)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Timeline */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <Calendar className="h-5 w-5" />
                                            Order Timeline
                                        </h3>
                                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                            <div className="flex items-start gap-3">
                                                <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5"></div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">Order Placed</p>
                                                    <p className="text-xs text-gray-500">{order.created_at}</p>
                                                </div>
                                            </div>
                                            {order.shipped_date && (
                                                <div className="flex items-start gap-3">
                                                    <div className="w-2 h-2 bg-purple-600 rounded-full mt-1.5"></div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">Shipped</p>
                                                        <p className="text-xs text-gray-500">{order.shipped_date}</p>
                                                    </div>
                                                </div>
                                            )}
                                            {order.delivered_date && (
                                                <div className="flex items-start gap-3">
                                                    <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5"></div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">Delivered</p>
                                                        <p className="text-xs text-gray-500">{order.delivered_date}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Payment Info */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                            <CreditCard className="h-5 w-5" />
                                            Payment Information
                                        </h3>
                                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Method</span>
                                                <span className="font-medium capitalize">{order.payment_method}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Currency</span>
                                                <span className="font-medium">{order.currency_code}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}