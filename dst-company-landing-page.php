<?php
/*
Plugin Name: DST Company Landing Page
Description: Hiển thị Landing Page của DST Company dạng Page Template hoặc Shortcode.
Version: 1.0
Author: DST Group
*/

if (!defined('ABSPATH')) exit;

// 1. Shortcode [dst_company_landing]
add_shortcode('dst_company_landing', 'dst_company_landing_render');
function dst_company_landing_render() {
    return dst_company_landing_get_html();
}

// 2. Thêm Page Template vào danh sách
add_filter('theme_page_templates', 'dst_company_landing_add_template');
function dst_company_landing_add_template($templates) {
    $templates['dst-company-landing-page-template.php'] = 'DST Company Landing Page';
    return $templates;
}

// 3. Load Template và ghi đè
add_filter('template_include', 'dst_company_landing_load_template');
function dst_company_landing_load_template($template) {
    if (get_page_template_slug() === 'dst-company-landing-page-template.php') {
        echo dst_company_landing_get_html();
        exit;
    }
    return $template;
}

// Hàm đọc và xử lý HTML để sửa các link tương đối thành tuyệt đối
function dst_company_landing_get_html() {
    $html_file = plugin_dir_path(__FILE__) . 'index.html';
    if (!file_exists($html_file)) {
        return 'Landing page file not found.';
    }
    
    $html = file_get_contents($html_file);
    $plugin_url = plugin_dir_url(__FILE__);
    
    // Tự động chuyển đổi các đường dẫn tương đối (href/src/url) thành đường dẫn tuyệt đối của plugin
    $html = preg_replace_callback(
        '/href=["\'](?!https?:\/\/|\/\/|#|mailto:|tel:)([^"\']+)["\']/i',
        function($matches) use ($plugin_url) {
            return 'href="' . $plugin_url . $matches[1] . '"';
        },
        $html
    );
    
    $html = preg_replace_callback(
        '/src=["\'](?!https?:\/\/|\/\/|data:)([^"\']+)["\']/i',
        function($matches) use ($plugin_url) {
            return 'src="' . $plugin_url . $matches[1] . '"';
        },
        $html
    );
    
    $html = preg_replace_callback(
        '/url\([\'"]?(?!https?:\/\/|\/\/|data:)([^\'"]+?)[\'"]?\)/i',
        function($matches) use ($plugin_url) {
            return 'url(\'' . $plugin_url . $matches[1] . '\')';
        },
        $html
    );
    
    return $html;
}
